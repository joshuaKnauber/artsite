import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import z from "zod";
import db from "@/db";
import { artworks as artworksTable, images as imagesTable } from "@/db/schema";

const schemaPostArtworkData = z.object({
  title: z.string().min(1),
  description: z.string(),
  tags: z.array(z.string()),
  imageIds: z.array(z.string()),
});

export type PostArtworkData = z.infer<typeof schemaPostArtworkData>;

export async function POST(request: NextRequest) {
  const data = (await request.json()) as PostArtworkData;

  if (!schemaPostArtworkData.safeParse(data).success) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  try {
    // add artwork
    const insertedArtworks = await db
      .insert(artworksTable)
      .values({
        title: data.title,
        description: data.description,
        user_id: userId,
      })
      .returning({ artworkId: artworksTable.id });
    const artworkId = insertedArtworks[0].artworkId;

    // add images
    await db.insert(imagesTable).values(
      data.imageIds.map((imageId) => ({
        artwork_id: artworkId,
        key: imageId,
      }))
    );

    return NextResponse.json({ id: artworkId });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
