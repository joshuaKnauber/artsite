import db from "@/db";
import { Artwork, images as imagesTable } from "@/db/schema";
import { TwicImg } from "@twicpics/components/react";
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
      <TwicImg
        className="pointer-events-none w-[500px] max-w-none"
        src={`/art/${thumbnail.key}`}
        ratio={thumbnail.width / thumbnail.height}
      />
    </div>
  );
};

export default ArtworkDisplay;
