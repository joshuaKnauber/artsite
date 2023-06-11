import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const artwork = (
    await db.select().from(artworksTable).where(eq(artworksTable.id, id))
  )[0];

  const artist = await clerkClient.users.getUser(artwork.user_id);

  return (
    <main className="flex min-h-screen">
      <h1>Artwork {artwork.title}</h1>
      <span>{artwork.description}</span>
      <Link href={`/user/${artist.username}`}>{artist.username}</Link>
    </main>
  );
}
