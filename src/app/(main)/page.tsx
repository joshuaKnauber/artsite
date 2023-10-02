import db from "@/db";
import {
  artworks as artworksTable,
  images,
  tagsToArtworks,
  tags as tagsTable,
  artworkThumbnails,
} from "@/db/schema";
import { arrayOverlaps, desc, eq, inArray, and, or, sql } from "drizzle-orm";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "../components/ArtworkCard";
import TagFilter from "../components/Tags/TagFilter";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { tags: string };
}) {
  const tags = searchParams.tags ? (searchParams.tags || "").split(",") : [];
  
  const artworks = await db.select({
    artwork: artworksTable,
    thumbnail: images,
  })
    .from(tagsToArtworks)
    .leftJoin(tagsTable, eq(tagsTable.id, tagsToArtworks.tag_id))
    .leftJoin(artworksTable, eq(artworksTable.id, tagsToArtworks.artwork_id))
    .leftJoin(artworkThumbnails, eq(artworkThumbnails.artwork_id, artworksTable.id))
    .leftJoin(images, eq(images.id, artworkThumbnails.thumbnail_image_id))
    .where(tags.length > 0 ? inArray(tagsTable.name, tags) : undefined)
    .groupBy(artworksTable.id, artworksTable.user_id, images.id, images.file_key, images.width, images.height)
    .orderBy(desc(artworksTable.created_at))
  
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-4 md:px-8 md:py-8">
      <TagFilter />
      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard
            thumbnail={artwork.thumbnail || undefined}
            artworkId={artwork.artwork?.id || ""}
            key={artwork.artwork?.id}
            artistId={artwork.artwork?.user_id}
            wip={artwork.artwork?.wip}
            feedback={artwork.artwork?.feedback}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
