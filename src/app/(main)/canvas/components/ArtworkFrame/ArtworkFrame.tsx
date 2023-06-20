import db from "@/db";
import { Artwork, images as imagesTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import FrameLinks from "./FrameLinks";
import FrameImage from "./FrameImage";

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
      <FrameLinks
        artwork={artwork}
        username={artist.username || undefined}
        profilePicture={artist.profileImageUrl || undefined}
      />
      <div className="absolute -left-3 -top-3 flex flex-row gap-2">
        <div className="rounded-full bg-bg-500">
          <span className="flex h-7 w-fit flex-row items-center justify-center rounded-full border border-purple-400 bg-purple-900 bg-opacity-10 px-3 text-sm font-light text-purple-400">
            WIP
          </span>
        </div>
        <div className="rounded-full bg-bg-500">
          <span className="flex h-7 w-fit flex-row items-center gap-3 rounded-full border border-orange-400 bg-orange-900 bg-opacity-10 px-3 text-sm font-light text-orange-400">
            Looking for feedback
          </span>
        </div>
      </div>
      <span className={`text-2xl font-medium max-w-[${SIZE}px] leading-snug`}>
        {artwork.title}
      </span>
      <div
        className="relative"
        style={{
          width: imgWidth,
          height: imgHeight,
        }}
      >
        <FrameImage width={imgWidth} height={imgHeight} thumbnail={thumbnail} />
      </div>
    </div>
  );
};

export default ArtworkFrame;
