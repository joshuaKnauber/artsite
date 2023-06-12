import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const { invite } = await request.json();

  if (!z.string().length(5).safeParse(invite).success) {
    return new NextResponse("Invalid Invite", { status: 400 });
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  // TODO - check if invite is valid
  if (invite !== "12345") {
    return new NextResponse("Invalid Invite", { status: 400 });
  }
  const user = await clerkClient.users.getUser(userId);

  clerkClient.users.updateUser(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      unlocked: true,
    },
  });

  return NextResponse.json({ unlocked: true });
}
