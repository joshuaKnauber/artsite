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
