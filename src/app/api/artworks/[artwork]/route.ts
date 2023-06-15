import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import db from "@/db";
import { artworks as artworksTable, images as imagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "uploadthing/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = params.artwork || "";

  if (!artworkId) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  try {
    const [artwork] = await db.query.artworks.findMany({
      where: eq(artworksTable.id, artworkId),
      columns: { user_id: true },
      with: {
        images: true,
      },
    });

    const { userId } = getAuth(request);

    if (!userId || !artwork || artwork.user_id !== userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // delete images in db
    if (artwork.images.length > 0)
      await db.delete(imagesTable).where(eq(imagesTable.artwork_id, artworkId));

    // delete artwork
    await db.delete(artworksTable).where(eq(artworksTable.id, artworkId));

    // delete images
    if (artwork.images.length > 0)
      await utapi.deleteFiles(artwork.images.map((image) => image.key));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
