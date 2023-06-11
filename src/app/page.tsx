import { clerkClient, currentUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types";
import InviteForm from "./components/InviteForm";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import ArtworkGrid from "@/components/ArtworkGrid";

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

  const artworks = await db.query.artworks.findMany({
    with: { images: true },
    columns: { id: true, title: true, user_id: true },
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <main className="flex w-full">
      <ArtworkGrid artworks={artworks} />
    </main>
  );
}
