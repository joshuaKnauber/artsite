import db from "@/db";
import {
  artworks as artworksTable,
  images,
  tagsToArtworks,
  tags as tagsTable,
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
    artworks: artworksTable,
    images: images
  })
    .from(tagsToArtworks)
    .leftJoin(tagsTable, eq(tagsTable.id, tagsToArtworks.tag_id))
    .leftJoin(artworksTable, eq(artworksTable.id, tagsToArtworks.artwork_id))
    .leftJoin(images, eq(images.id, artworksTable.thumbnail_image_id))
    .where(tags.length > 0 ? inArray(tagsTable.name, tags) : undefined)
    .groupBy(artworksTable.id, artworksTable.user_id, images.id, images.file_key, images.width, images.height)
    .orderBy(desc(artworksTable.created_at))
  
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-4 md:px-8 md:py-8">
      <TagFilter />
      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard
            thumbnail={artwork.images || undefined}
            artworkId={artwork.artworks?.id || ""}
            key={artwork.artworks?.id}
            artistId={artwork.artworks?.user_id}
            wip={artwork.artworks?.wip}
            feedback={artwork.artworks?.feedback}
          />
        ))}
      </ArtworkGrid>
    </div>
  );
}
