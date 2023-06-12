import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import z from "zod";

const userMetadataBodySchema = z.object({
  location: z.string(),
  bio: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  for_hire: z.boolean(),
});

export type UserMetadataBody = z.infer<typeof userMetadataBodySchema>;

export async function POST(request: NextRequest) {
  const data = (await request.json()) as UserMetadataBody;

  if (!userMetadataBodySchema.safeParse(data).success) {
    return new NextResponse("Invalid Data", { status: 400 });
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }
  const user = await clerkClient.users.getUser(userId);

  clerkClient.users.updateUser(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      location: data.location,
      bio: data.bio,
      twitter: data.twitter,
      instagram: data.instagram,
      for_hire: data.for_hire,
    },
  });

  return NextResponse.json({ ok: true });
}
