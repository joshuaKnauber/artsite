import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import db from "@/db";
import { notifications as notificationsTable } from "@/db/schema";

export async function POST(
  request: NextRequest,
  { params }: { params: { notification: string } }
) {
  const notificationId = parseInt(params.notification || "");

  if (isNaN(notificationId)) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  await db.update(notificationsTable).set({
    is_read: true,
  });

  return NextResponse.json({ ok: true });
}
