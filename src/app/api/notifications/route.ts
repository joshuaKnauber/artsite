import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { ClerkUser } from "@/types";
import db from "@/db";
import { desc, eq, inArray } from "drizzle-orm";
import {
  Artwork,
  Comment,
  Notification,
  notifications as notificationsTable,
  comments as commentsTable,
  artworks
} from "@/db/schema";

export type RichNotification = Notification & {
  source: Comment | null;
  sourceOrigin: Artwork | null;
  sourceAuthor: ClerkUser | null;
};

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  // get notifications
  const notifications = (await db.query.notifications.findMany({
    where: eq(notificationsTable.user_id, userId),
    orderBy: desc(notificationsTable.created_at),
  })) as Notification[];
  const commentIds = notifications
    .map((n) => (n.source_type === "comment" ? n.comment_id : null))
    .filter((id) => id !== null) as number[];

  // get sources
  const comments =
    commentIds.length > 0
      // ? await db.query.comments.findMany({
      //     where: inArray(notificationsTable.id, commentIds),
      //   })
      ? await db.select().from(commentsTable)
          .leftJoin(artworks, eq(commentsTable.artwork_id, artworks.id))
          .where(inArray(commentsTable.id, commentIds))
      : [];
  const commentAuthorIds = comments.map((c) => c.comments.user_id);

  const commentAuthors =
    commentAuthorIds.length > 0
      ? ((await clerkClient.users.getUserList({
          userId: commentAuthorIds,
        })) as ClerkUser[])
      : [];

  // combine notifications with sources
  const notificationsWithSources: RichNotification[] = notifications.map(
    (n) => {
      if (n.source_type === "comment") {
        const comment = comments.find((c) => c.comments.id === n.comment_id)?.comments  || null;
        const author = commentAuthors.find((a) => a.id === comment?.user_id) || null;
        const origin = comments.find((c) => c.comments.id === n.comment_id)?.artworks  || null;
        return {
          ...n,
          source: comment || null,
          sourceAuthor: author || null,
          sourceOrigin: origin || null,
        };
      }
      return {
        ...n,
        source: null,
        sourceAuthor: null,
        sourceOrigin: null,
      };
    }
  );

  return NextResponse.json(notificationsWithSources);
}
