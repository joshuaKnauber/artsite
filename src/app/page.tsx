import { currentUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types";
import InviteForm from "./components/InviteForm";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function HomePage() {
  const user = (await currentUser()) as ClerkUser | null;

  if (!user) {
    return (
      <main className="flex">
        <h1>{"Discover (not signed in)"}</h1>
      </main>
    );
  }

  if (!user.publicMetadata.unlocked) {
    return (
      <main className="flex">
        <h1>{"Discover (not unlocked)"}</h1>
        <InviteForm />
      </main>
    );
  }

  const artworks = await db
    .select({
      id: artworksTable.id,
      title: artworksTable.title,
      userId: artworksTable.user_id,
    })
    .from(artworksTable)
    .orderBy(desc(artworksTable.created_at));

  return (
    <main className="flex">
      <h1>Discover</h1>
      <div>
        {artworks.map((artwork) => (
          <Link href={`/a/${artwork.id}`} key={artwork.id}>
            {artwork.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
