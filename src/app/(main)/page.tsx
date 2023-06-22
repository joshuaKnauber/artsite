import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "../components/ArtworkCard";

export default async function HomePage() {
  const artworks = await db.query.artworks.findMany({
    columns: {
      id: true,
      key: true,
      title: true,
      wip: true,
      feedback: true,
      user_id: true,
    },
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <div className="flex w-full px-4 py-4 md:px-8 md:py-8">
      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard
            id={artwork.id}
            artworkKey={artwork.key}
            key={artwork.id}
            artistId={artwork.user_id}
            wip={artwork.wip}
            feedback={artwork.feedback}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
