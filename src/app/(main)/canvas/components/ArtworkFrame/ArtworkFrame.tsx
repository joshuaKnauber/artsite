import db from "@/db";
import { Artwork, images as imagesTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { TwicImg } from "@twicpics/components/react";
import { eq } from "drizzle-orm";
import FrameLinks from "./FrameLinks";

type ArtworkFrameProps = {
  artwork: Artwork;
};

const ArtworkFrame = async ({ artwork }: ArtworkFrameProps) => {
  const images = await db.query.images.findMany({
    where: eq(imagesTable.artwork_id, artwork.id),
  });

  const thumbnail = images.find((i) => i.is_thumbnail);
  if (!thumbnail) return null;

  const [artist] = await clerkClient.users.getUserList({
    userId: [artwork.user_id],
  });

  const SIZE = 700;

  const imgWidth =
    thumbnail.width > thumbnail.height
      ? SIZE
      : Math.round((SIZE * thumbnail.width) / thumbnail.height);
  const imgHeight =
    thumbnail.height > thumbnail.width
      ? SIZE
      : Math.round((SIZE * thumbnail.height) / thumbnail.width);

  return (
    <div className="relative flex flex-col gap-8 rounded-xl border border-white border-opacity-20 bg-bg-500 p-12 pt-8">
      <FrameLinks artwork={artwork} artist={artist} />
      <span className={`text-2xl font-medium max-w-[${SIZE}px] leading-snug`}>
        {artwork.title}
      </span>
      <div
        style={{
          width: imgWidth,
          height: imgHeight,
        }}
      >
        <TwicImg
          className={`h-[${imgHeight}px] w-[${imgWidth}px]`}
          src={`/art/${thumbnail.key}`}
          ratio={thumbnail.width / thumbnail.height}
          mode="contain"
        />
      </div>
    </div>
  );
};

export default ArtworkFrame;
