import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import db from "@/db";
import {
  artworks as artworksTable,
  images as imagesTable,
  comments as commentsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = parseInt(params.artwork || "");

  if (isNaN(artworkId)) {
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

    // delete comments in db
    await db
      .delete(commentsTable)
      .where(eq(commentsTable.artwork_id, artworkId));

    // delete images in db
    const images = await db.query.images.findMany({
      where: eq(imagesTable.artwork_id, artworkId),
    });
    await db.delete(imagesTable).where(eq(imagesTable.artwork_id, artworkId));

    // delete artwork
    await db.delete(artworksTable).where(eq(artworksTable.id, artworkId));

    // delete images
    await utapi.deleteFiles(images.map((image) => image.key));

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
  const artworkId = parseInt(params.artwork || "");
  const data = (await request.json()) as UpdateArtworkData;

  if (
    isNaN(artworkId) ||
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
    await db
      .update(artworksTable)
      .set({
        title: data.title,
        description: data.description,
        wip: data.wip,
        feedback: data.wantsFeedback,
      })
      .where(eq(artworksTable.id, artworkId));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
