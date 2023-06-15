import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import z from "zod";
import db from "@/db";
import { comments as commentsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const schemaPostComment = z.object({
  text: z.string().min(1).max(1000),
  imageId: z.string().uuid().optional(),
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
    const [insertedComment] = await db
      .insert(commentsTable)
      .values({
        text: data.text,
        artwork_id: artworkId,
        user_id: userId,
        is_feedback: data.imageId !== undefined,
        feedback_image_id: data.imageId,
        feedback_image_x: (data.posX || 0).toString(),
        feedback_image_y: (data.posY || 0).toString(),
      })
      .returning({ commentId: commentsTable.id });
    const commentId = insertedComment.commentId;

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

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
