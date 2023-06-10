import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import z from "zod";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  console.log(userId);
  //   if (!userId) {
  //     return new NextResponse("Unauthorized", {
  //       status: 401,
  //     });
  //   }

  // TODO get invites from database

  return NextResponse.json({ invites: [] });
}

export async function POST(request: NextRequest) {
  console.log("hit post");
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

  clerkClient.users.updateUser(userId, {
    publicMetadata: {
      unlocked: true,
    },
  });

  return NextResponse.json({ unlocked: true });
}
