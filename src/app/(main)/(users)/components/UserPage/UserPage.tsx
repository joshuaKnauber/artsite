import db from "@/db";
import { desc, eq } from "drizzle-orm";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "@/app/components/ArtworkCard";
import Link from "next/link";
import { LinkIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProfileDialogButton from "./components/ProfileDialogButton";
import ProfileDialog from "./components/ProfileDialog";

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
    <>
      <ProfileDialog />
      <div className="flex w-full flex-col gap-8 px-4 py-8 md:flex-row md:gap-0 md:px-0 md:py-0">
        <div
          className={`flex w-full flex-col gap-8 overflow-y-auto md:sticky md:left-0 md:h-[calc(100vh-4rem)] md:w-[450px] ${
            minimal
              ? "md:top-0 md:gap-10 md:px-12 md:py-12"
              : "md:top-16 md:px-8 md:py-8"
          }`}
        >
          {!minimal && isProfile && (
            <div className="flex h-8 w-full flex-shrink-0 flex-row items-center gap-2">
              <Link
                className="flex h-full flex-grow items-center gap-2 rounded-md border border-amber-400 border-opacity-50 bg-amber-900 bg-opacity-10 px-2 text-sm font-light text-amber-400 transition-all md:hover:border-opacity-100"
                href={`/u/${user.username}`}
              >
                <ArrowRightIcon className="h-3 w-3" />
                View your portfolio
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
              className="h-28 w-28 rounded-full"
            />
            <div className="flex h-full flex-1 flex-col justify-between">
              {user.firstName || user.lastName ? (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-xl font-semibold leading-none">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="leading-none opacity-50">
                      @{user.username}
                    </span>
                  </div>
                  {isProfile && !minimal && <ProfileDialogButton />}
                </>
              ) : (
                <span className="text-lg leading-none">@{user.username}</span>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 opacity-50">
            <MapPinIcon className="h-5 w-5" />
            <span>My Location</span>
          </div>
          <span className="whitespace-pre-line font-light leading-snug opacity-75">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            possimus quam nostrum voluptatem expedita quae nobis iste tempora,
            ullam recusandae inventore maiores enim!
          </span>
        </div>
        <div
          className={`md:flex-grow md:bg-bg-400 ${
            minimal ? "md:px-12 md:py-12" : "md:px-8 md:py-8"
          }`}
        >
          <ArtworkGrid>
            {artworks.map((artwork) => (
              <ArtworkCard
                id={artwork.id}
                key={artwork.id}
                thumbnailKey={artwork.images[0]?.key || ""}
                minimal={minimal}
              />
            ))}
          </ArtworkGrid>
        </div>
      </div>
    </>
  );
};

export default UserPage;
