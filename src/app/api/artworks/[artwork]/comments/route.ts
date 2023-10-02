import { NextRequest, NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import z from "zod";
import db from "@/db";
import {
  artworks as artworksTable,
  comments as commentsTable,
  notifications as notificationsTable,
} from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const schemaPostComment = z.object({
  text: z.string().min(1).max(1000),
  imageId: z.number().optional(),
  posX: z.number().min(0).max(100).optional(),
  posY: z.number().min(0).max(100).optional(),
});

export type PostComment = z.infer<typeof schemaPostComment>;

export async function POST(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = params.artwork || "";
  const data = (await request.json()) as PostComment;

  if (
    !schemaPostComment.safeParse(data).success ||
    (data.posX === undefined) !== (data.posY === undefined) ||
    (data.posX !== undefined) !== (data.imageId !== undefined) ||
    !artworkId
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
    const commentId = await db.transaction(async db => {
      const res = await db
        .insert(commentsTable)
        .values({
          text: data.text,
          user_id: userId,
          artwork_id: artworkId,
  
          is_feedback: data.imageId !== undefined,
          feedback_image_id: data.imageId,
          feedback_image_x: (data.posX || 0).toString(),
          feedback_image_y: (data.posY || 0).toString(),
        })
        .returning({ commentId: commentsTable.id });
      const commentId = res[0].commentId;
  
      const artwork = await db.query.artworks.findFirst({
        where: eq(artworksTable.id, artworkId),
        columns: { user_id: true },
      });
  
      // send notification to artwork owner
      if (artwork && artwork.user_id !== userId)
        await db.insert(notificationsTable).values({
          user_id: artwork.user_id,
          comment_id: commentId,
          source_type: "comment",
        });

      return commentId
    })

    return NextResponse.json({ id: commentId });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { artwork: string } }
) {
  const artworkId = params.artwork || "";
  if (!artworkId) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  try {
    const comments = await db.query.comments.findMany({
      where: eq(commentsTable.artwork_id, artworkId),
      orderBy: desc(commentsTable.created_at),
    });

    const authors = await clerkClient.users.getUserList({
      userId: comments.map((c) => c.user_id),
    });

    return NextResponse.json({ comments, authors });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
