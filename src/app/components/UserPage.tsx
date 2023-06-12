import db from "@/db";
import { desc, eq } from "drizzle-orm";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "@/app/components/ArtworkCard";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/solid";
import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type UserPageProps = {
  name: string;
  minimal?: boolean;
};

const UserPage = async ({ name, minimal }: UserPageProps) => {
  const users = await clerkClient.users.getUserList({ username: [name] });
  if (users.length === 0) throw new Error("User not found");
  const user = users[0];

  const current = await currentUser();
  const isProfile = current && current.id === user.id;

  const artworks = await db.query.artworks.findMany({
    with: { images: true },
    where: eq(artworksTable.user_id, user.id),
    columns: { id: true, title: true, user_id: true },
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-4 md:flex-row md:gap-0 md:px-0 md:py-0">
      <div
        className={`flex w-full flex-col gap-8 overflow-y-auto md:sticky md:left-0 md:h-[calc(100vh-4rem)] md:w-[450px] md:px-8 md:py-8 ${
          minimal ? "md:top-0" : "md:top-16"
        }`}
      >
        {!minimal && isProfile && (
          <div className="flex h-7 w-full flex-row items-center gap-2">
            <Link
              className="flex h-full flex-grow items-center gap-2 rounded-md border border-amber-400 border-opacity-50 bg-amber-900 bg-opacity-10 px-2 text-sm font-light text-amber-400 transition-all md:hover:border-opacity-100"
              href={`/u/${user.username}`}
            >
              <ArrowRightIcon className="h-3 w-3" />
              Visit shareable portfolio
            </Link>
            <button className="flex aspect-square h-full items-center justify-center rounded-md border border-amber-400 border-opacity-50 bg-amber-900 bg-opacity-10 text-amber-400 transition-all md:hover:border-opacity-100">
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex flex-row items-start gap-4">
          <img
            src={user.profileImageUrl}
            alt="Profile Picture"
            className="h-14 w-14 rounded-md"
          />
          <span className="text-lg">{user.username}</span>
        </div>
        <div className="flex flex-row items-center gap-2 opacity-50">
          <MapPinIcon className="h-5 w-5" />
          <span>My Location</span>
        </div>
        <span className="whitespace-pre-line font-light leading-snug opacity-50">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
          possimus quam nostrum voluptatem expedita quae nobis iste tempora,
          ullam recusandae inventore maiores enim!
        </span>
        <div className="flex flex-row items-center gap-2">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-white"
          >
            <LinkIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="md:flex-grow md:bg-bg-400 md:px-8 md:py-8">
        <ArtworkGrid>
          {artworks.map((artwork) => (
            <ArtworkCard
              id={artwork.id}
              key={artwork.id}
              thumbnailKey={artwork.images[0]?.key || ""}
            />
          ))}
        </ArtworkGrid>
      </div>
    </div>
  );
};

export default UserPage;
