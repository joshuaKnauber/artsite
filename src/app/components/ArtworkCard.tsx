import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";

type ArtworkCardProps = {
  id: string;
  artistId?: string;
  thumbnailKey: string;
  minimal?: boolean;
};

const ArtworkCard = async ({
  id,
  thumbnailKey,
  artistId,
  minimal,
}: ArtworkCardProps) => {
  const artist =
    artistId && !minimal && (await clerkClient.users.getUser(artistId));

  return (
    <div
      className={
        "group/artwork flex w-full flex-grow flex-col gap-2 transition-all md:hover:scale-[102%]"
      }
    >
      {thumbnailKey && (
        <Link
          href={minimal ? `/a/${id}?min=1` : `/a/${id}`}
          className="relative w-full overflow-hidden"
        >
          {artist && (
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] opacity-0 transition-all md:hover:opacity-100">
              <Link
                href={`/user/${artist.username || ""}`}
                className="absolute bottom-4 left-4 flex w-fit flex-row items-center gap-3"
              >
                <img
                  src={artist.profileImageUrl || ""}
                  className="h-7 w-7 rounded-full"
                />
                <span className="leading-none">{artist.username || ""}</span>
              </Link>
            </div>
          )}
          <img
            src={`https://uploadthing.com/f/${thumbnailKey}`}
            className="w-full"
          />
        </Link>
      )}
    </div>
  );
};

export default ArtworkCard;
