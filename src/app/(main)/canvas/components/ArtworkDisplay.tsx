import db from "@/db";
import { Artwork, images as imagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type ArtworkDisplayProps = {
  artwork: Artwork;
};

const ArtworkDisplay = async ({ artwork }: ArtworkDisplayProps) => {
  const images = await db.query.images.findMany({
    where: eq(imagesTable.artwork_id, artwork.id),
  });

  const thumbnail = images.find((i) => i.is_thumbnail);
  if (!thumbnail) return null;

  return (
    <div className="flex flex-col">
      <span className="text-2xl">{artwork.title}</span>
      <img
        className="pointer-events-none max-w-none"
        src={`https://uploadthing.com/f/${thumbnail.key}`}
        style={{
          width: 500,
          aspectRatio: thumbnail.width / thumbnail.height,
        }}
      />
    </div>
  );
};

export default ArtworkDisplay;
