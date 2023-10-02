import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import db from "@/db";
import {
  artworks as artworksTable,
  images as imagesTable,
  comments as commentsTable,
  tagsToArtworks,
  artworkThumbnails,
  tags as tagsTable,
} from "@/db/schema";
import { and, eq, inArray, not, sql } from "drizzle-orm";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = params.artwork || "";

  if (!artworkId) {
    return new NextResponse("Invalid Artwork", { status: 400 });
  }

  try {
    const artwork = await db.query.artworks.findFirst({
      where: eq(artworksTable.id, artworkId),
    });

    const { userId } = getAuth(request);

    if (!userId || !artwork || artwork.user_id !== userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const images = await db.transaction(async (tx) => {
      // delete comments in db
      await tx
        .delete(commentsTable)
        .where(eq(commentsTable.artwork_id, artworkId));

      // delete tags in db
      await tx
        .delete(tagsToArtworks)
        .where(eq(tagsToArtworks.artwork_id, artworkId));

      // delete thumbnail in db
      await tx
        .delete(artworkThumbnails)
        .where(eq(artworkThumbnails.artwork_id, artworkId));
  
      // delete images in db
      const images = await tx.query.images.findMany({
        where: eq(imagesTable.artwork_id, artworkId),
      });
      await tx.delete(imagesTable).where(eq(imagesTable.artwork_id, artworkId));
  
      // delete artwork
      await tx.delete(artworksTable).where(eq(artworksTable.id, artworkId));

      return images
    })
    
    // delete image files
    await utapi.deleteFiles(images.map((image) => image.file_key));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

const schemaUpdateArtwork = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(0).max(1000).optional(),
  tags: z.array(z.string()).optional(),
  imageIds: z.array(z.string()).optional(),
  imageSizes: z
    .array(z.object({ width: z.number(), height: z.number() }))
    .optional(),
  wantsFeedback: z.boolean().optional(),
  thumbnailIndex: z.number().min(0).optional(),
  wip: z.boolean().optional(),
});

export type UpdateArtworkData = z.infer<typeof schemaUpdateArtwork>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = params.artwork || "";
  const data = (await request.json()) as UpdateArtworkData;

  if (
    !artworkId ||
    !schemaUpdateArtwork.safeParse(data).success ||
    (data.imageIds &&
      (!data.imageSizes ||
        !data.thumbnailIndex ||
        data.imageSizes.length !== data.imageIds.length ||
        data.thumbnailIndex >= data.imageIds.length))
  ) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  try {
    const artwork = await db.query.artworks.findFirst({
      where: eq(artworksTable.id, artworkId),
    });

    const { userId } = getAuth(request);

    if (!userId || !artwork || artwork.user_id !== userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // update metadata
    await db.transaction(async tx => {
      // update artwork
      await db
        .update(artworksTable)
        .set({
          title: data.title,
          description: data.description,
          wip: data.wip,
          feedback: data.wantsFeedback,
        })
        .where(eq(artworksTable.id, artworkId));

      // update tags
      const newTags = data.tags
      if (newTags) {
        const insertedTags = await tx
        .insert(tagsTable)
        .values(
          newTags.map(t => ({ name: t }))
            )
          .onConflictDoUpdate({
            target: tagsTable.name,
            set: {
              name: sql`excluded.name`,
            },
          })
          .returning({ tagId: tagsTable.id });
        
        // remove tags from artwork
        await tx
          .delete(tagsToArtworks)
          .where(and(
            eq(tagsToArtworks.artwork_id, artworkId),
            not(inArray(tagsToArtworks.tag_id, insertedTags.map(({ tagId }) => tagId)))
          ))
  
        // add tags to artwork
        await tx.insert(tagsToArtworks).values(
          insertedTags.map(({ tagId }) => ({
            artwork_id: artworkId,
            tag_id: tagId,
          }))
        ).onConflictDoNothing()
      }
    })

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
