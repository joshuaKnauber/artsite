import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";

type ArtworkCardProps = {
  id: string;
  artistId?: string;
  thumbnailKey: string;
};

const ArtworkCard = async ({
  id,
  thumbnailKey,
  artistId,
}: ArtworkCardProps) => {
  const artist = artistId && (await clerkClient.users.getUser(artistId));

  return (
    <div className={"group/artwork flex w-full flex-grow flex-col gap-2"}>
      {thumbnailKey && (
        <Link href={`/a/${id}`} className="relative w-full rounded-lg">
          <img
            src={`https://uploadthing.com/f/${thumbnailKey}`}
            className="w-full rounded-lg"
          />
        </Link>
      )}
      <div className="flex flex-row items-center justify-between">
        {artist && (
          <Link
            href={`/user/${artist.username || ""}`}
            className="flex w-fit flex-row items-center gap-3 rounded-full bg-white bg-opacity-0 transition-all md:p-1.5 md:pr-4 md:hover:bg-opacity-10"
          >
            <img
              src={artist.profileImageUrl || ""}
              className="h-7 w-7 rounded-full"
            />
            <span className="leading-none">{artist.username || ""}</span>
          </Link>
        )}
        <div className="flex flex-row items-center gap-2 transition-opacity md:opacity-0 md:group-hover/artwork:opacity-100">
          {/* <button>test</button>
          <button>test</button> */}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
