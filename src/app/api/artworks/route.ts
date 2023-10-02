import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import z from "zod";
import db from "@/db";
import {
  artworkThumbnails,
  artworks as artworksTable,
  images as imagesTable,
  tags as tagsTable,
  tagsToArtworks,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const schemaPostArtworkData = z.object({
  title: z.string().min(1),
  description: z.string(),
  tags: z.array(z.string()),
  imageIds: z.array(z.string()),
  imageSizes: z.array(z.object({ width: z.number(), height: z.number() })),
  wantsFeedback: z.boolean(),
  thumbnailIndex: z.number().min(0),
  wip: z.boolean(),
});

export type PostArtworkData = z.infer<typeof schemaPostArtworkData>;

export async function POST(request: NextRequest) {
  const data = (await request.json()) as PostArtworkData;

  if (
    !schemaPostArtworkData.safeParse(data).success ||
    data.imageIds.length !== data.imageSizes.length
  ) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  try {
    const newArtwork = await db.transaction(async (tx) => {
      // add artwork
      const [createdArtwork] = await tx
        .insert(artworksTable)
        .values({
          title: data.title,
          description: data.description,
          user_id: userId,
          feedback: data.wantsFeedback,
          wip: data.wip,
        })
        .returning();

      // add images
      const createdImages = await tx.insert(imagesTable).values(
        data.imageIds.map((imageId, i) => ({
          artwork_id: createdArtwork.id,
          file_key: imageId,
          width: data.imageSizes[i].width,
          height: data.imageSizes[i].height,
        }))
      ).returning({ id: imagesTable.id });
      
      // update thumbnail
      const thumbnailId = createdImages[data.thumbnailIndex].id
      await tx.insert(artworkThumbnails).values({
        artwork_id: createdArtwork.id,
        thumbnail_image_id: thumbnailId,
      });

      // add tags
      if (data.tags.length> 0) {
        const insertedTags = await tx
        .insert(tagsTable)
        .values(
            data.tags.map((tag) => ({
              name: tag,
            }))
            )
          .onConflictDoUpdate({
            target: tagsTable.name,
            set: {
              name: sql`excluded.name`,
            },
          })
          .returning({ tagId: tagsTable.id });

        // add tags to artwork
        await tx.insert(tagsToArtworks).values(
          insertedTags.map(({ tagId }) => ({
            artwork_id: createdArtwork.id,
            tag_id: tagId,
          }))
        );
      } 

      return createdArtwork
    });
    return NextResponse.json(newArtwork);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
