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
    <div className={"flex w-full flex-grow flex-col gap-2"}>
      {thumbnailKey && (
        <Link href={`/a/${id}`} className="relative w-full">
          <div className="absolute left-0 top-0 hidden h-full w-full bg-black bg-opacity-20 opacity-0 transition-opacity hover:opacity-100 md:block"></div>
          <img
            src={`https://uploadthing.com/f/${thumbnailKey}`}
            className="w-full rounded-lg"
          />
        </Link>
      )}
      {artist && (
        <Link
          href={`/user/${artist.username || ""}`}
          className="flex w-fit flex-row items-center gap-4 rounded-full bg-white bg-opacity-0 transition-all md:p-1.5 md:pr-4 md:hover:bg-opacity-10"
        >
          <img
            src={artist.profileImageUrl || ""}
            className="h-8 w-8 rounded-full"
          />
          <span className="leading-none">{artist.username || ""}</span>
        </Link>
      )}
    </div>
  );
};

export default ArtworkCard;
