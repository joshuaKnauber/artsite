import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";
import db from "@/db";
import { eq } from "drizzle-orm";
import { images as imagesTable } from "@/db/schema";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

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
        "group/artwork flex w-full flex-grow flex-col gap-2 transition-all md:hover:scale-[102%]"
      }
      style={{
        aspectRatio: thumbnail ? thumbnail.width / thumbnail.height : 1,
      }}
    >
      {thumbnail && (
        <Link
          href={minimal ? `/a/${artworkKey}?min=1` : `/a/${artworkKey}`}
          className="relative w-full overflow-hidden"
        >
          <div className="absolute right-4 top-4 flex flex-row gap-2">
            {wip && (
              <span className="flex h-6 items-center rounded-full border border-purple-400 bg-purple-950 bg-opacity-70 px-2 text-sm leading-none text-purple-400">
                WIP
              </span>
            )}
            {feedback && (
              <span className="flex h-6 w-7 items-center justify-center rounded-full border border-orange-400 bg-orange-950 bg-opacity-60 text-sm leading-none text-orange-400">
                <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />
              </span>
            )}
          </div>
          {artist && (
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] opacity-0 transition-all md:hover:opacity-100">
              <Link
                href={`/user/${artist.username || ""}`}
                className="absolute bottom-4 left-4 flex w-fit flex-row items-center gap-3"
              >
                <img
                  src={artist.profileImageUrl || ""}
                  className="h-7 w-7 rounded-full"
                  style={{
                    objectFit: "cover",
                    aspectRatio: thumbnail.width / thumbnail.height,
                  }}
                />
                <span className="leading-none">{artist.username || ""}</span>
              </Link>
            </div>
          )}
          <img
            src={`https://uploadthing.com/f/${thumbnail.key}`}
            className="w-full"
            style={{
              aspectRatio: thumbnail ? thumbnail.width / thumbnail.height : 1,
            }}
          />
        </Link>
      )}
    </div>
  );
};

export default ArtworkCard;
