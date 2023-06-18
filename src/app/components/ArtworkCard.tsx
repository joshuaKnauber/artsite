import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";
import db from "@/db";
import { eq } from "drizzle-orm";
import { images as imagesTable } from "@/db/schema";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { TwicImg } from "@twicpics/components/react";

type ArtworkCardProps = {
  id: number;
  artworkKey: string;
  artistId?: string;
  minimal?: boolean;
  wip?: boolean;
  feedback?: boolean;
};

const ArtworkCard = async ({
  id,
  artworkKey,
  artistId,
  minimal,
  wip,
  feedback,
}: ArtworkCardProps) => {
  const artist =
    artistId && !minimal && (await clerkClient.users.getUser(artistId));

  const images = await db.query.images.findMany({
    where: eq(imagesTable.artwork_id, id),
  });
  const thumbnail = images.find((img) => img.is_thumbnail);

  return (
    <div
      className={
        "group/artwork relative flex w-full flex-grow flex-col gap-2 transition-all md:hover:scale-[102%]"
      }
      style={{
        aspectRatio: thumbnail ? thumbnail.width / thumbnail.height : 1,
      }}
    >
      <Link
        href={minimal ? `/a/${artworkKey}?min=1` : `/a/${artworkKey}`}
        className="relative h-full w-full overflow-hidden"
      >
        <div className="absolute right-4 top-4 flex flex-row gap-2">
          {wip && (
            <span className="flex h-7 items-center rounded-full border border-white border-opacity-30 bg-black bg-opacity-70 px-3 text-sm font-light leading-none text-white text-opacity-80">
              WIP
            </span>
          )}
          {feedback && (
            <span className="flex h-7 items-center rounded-full border border-white border-opacity-30 bg-black bg-opacity-70 px-3 text-sm font-light leading-none text-white text-opacity-80">
              <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />
            </span>
          )}
        </div>
        {thumbnail && (
          <TwicImg
            src={thumbnail.key}
            className="w-full"
            ratio={thumbnail.width / thumbnail.height}
          />
        )}
      </Link>
      {artist && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] opacity-0 transition-all md:group-hover/artwork:opacity-100"></div>
          <Link
            href={`/user/${artist.username || ""}`}
            className="absolute bottom-4 left-4 flex w-fit flex-row items-center gap-3 opacity-0 transition-all md:group-hover/artwork:opacity-100"
          >
            <img
              src={artist.profileImageUrl || ""}
              className="h-7 w-7 rounded-full"
            />
            <span className="leading-none">{artist.username || ""}</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default ArtworkCard;
