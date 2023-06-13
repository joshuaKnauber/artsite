import { currentUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types";
import InviteForm from "@/app/components/InviteForm";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "../components/ArtworkCard";
import Header from "../components/Header";

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
    <>
      <Header />
      <main className="flex w-full flex-col">
        <div className="flex w-full px-4 py-4 md:px-8 md:py-8">
          <ArtworkGrid>
            {artworks.map((artwork) => {
              const thumbnail =
                artwork.images.find((img) => img.is_thumbnail) ||
                artwork.images[0];
              return (
                <ArtworkCard
                  id={artwork.id}
                  key={artwork.id}
                  artistId={artwork.user_id}
                  thumbnailKey={thumbnail.key}
                  thumbnailSize={{
                    width: thumbnail.width,
                    height: thumbnail.height,
                  }}
                />
              );
            })}
          </ArtworkGrid>
        </div>
      </main>
    </>
  );
}
