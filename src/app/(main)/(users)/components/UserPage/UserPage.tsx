import db from "@/db";
import { desc, eq } from "drizzle-orm";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "@/app/components/ArtworkCard";
import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/solid";
import ProfileDialogButton from "./components/ProfileDialogButton";
import ProfileDialog from "./components/ProfileDialog";
import { InstagramIcon, TwitterIcon } from "./components/Icons";
import { ClerkUser } from "@/types";
import PortfolioLinks from "./components/PortfolioLinks";

type UserPageProps = {
  name: string;
  minimal?: boolean;
};

const UserPage = async ({ name, minimal }: UserPageProps) => {
  const users = await clerkClient.users.getUserList({ username: [name] });
  if (users.length === 0) throw new Error("User not found");
  const user = users[0] as ClerkUser;

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
      {isProfile && <ProfileDialog />}
      <div className="flex w-full flex-col gap-8 px-4 py-8 md:flex-row md:gap-0 md:px-0 md:py-0">
        <div
          className={`flex w-full flex-shrink-0 flex-col gap-8 overflow-y-auto md:sticky md:left-0 md:h-[100vh] md:w-sidebar ${
            minimal
              ? "md:top-0 md:gap-10 md:px-12 md:py-12"
              : "md:top-header md:max-h-[calc(100vh-4rem)] md:px-8 md:py-8"
          }`}
        >
          {user.publicMetadata.for_hire && (
            <div className="flex w-fit flex-row items-center gap-4 rounded-full bg-orange-900 bg-opacity-10 px-6 py-2">
              <div className="h-1 w-1 rounded-full bg-orange-400"></div>
              <span className="text-sm text-orange-400">For Hire!</span>
            </div>
          )}
          <div className="flex w-full flex-row items-start gap-4">
            <img
              src={user.profileImageUrl}
              alt="Profile Picture"
              className="h-28 w-28 rounded-full"
            />
            <div className="flex h-28 flex-grow flex-col justify-between">
              <div
                className={`flex flex-grow flex-col gap-2 ${
                  !minimal && isProfile ? "justify-start" : "justify-center"
                }`}
              >
                {user.firstName || user.lastName ? (
                  <>
                    <span className="text-xl font-semibold leading-none">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="leading-none opacity-50">
                      @{user.username}
                    </span>
                  </>
                ) : (
                  <span className="text-lg leading-none">@{user.username}</span>
                )}
              </div>
              {isProfile && !minimal && <ProfileDialogButton />}
            </div>
          </div>
          {user.publicMetadata.location && (
            <div className="flex flex-row items-center gap-2 opacity-50">
              <MapPinIcon className="h-5 w-5" />
              <span>{user.publicMetadata.location}</span>
            </div>
          )}
          {user.publicMetadata.bio && (
            <span className="whitespace-pre-line font-light leading-snug opacity-75">
              {user.publicMetadata.bio}
            </span>
          )}
          <div className="flex flex-row items-center gap-2">
            {user.publicMetadata.twitter && (
              <Link
                href={user.publicMetadata.twitter}
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white bg-opacity-0 md:hover:bg-opacity-5"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
            )}
            {user.publicMetadata.instagram && (
              <Link
                href={user.publicMetadata.instagram}
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white bg-opacity-0 md:hover:bg-opacity-5"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
            )}
          </div>
          {!minimal && isProfile && (
            <PortfolioLinks username={user.username || ""} />
          )}
          {minimal && (
            <div className="hidden flex-grow flex-col justify-end md:flex">
              <Link
                href={`/user/${user.username}`}
                className="text-light flex flex-row items-center gap-2 text-sm opacity-50"
              >
                <ArrowLeftIcon className="h-3 w-3" />
                Back to Duet
              </Link>
            </div>
          )}
        </div>
        <div
          className={`md:flex-grow md:bg-bg-400 ${
            minimal ? "md:px-12 md:py-12" : "md:px-8 md:py-8"
          }`}
        >
          <ArtworkGrid>
            {artworks.map((artwork) => {
              const thumbnail =
                artwork.images.find((img) => img.is_thumbnail) ||
                artwork.images[0];
              return (
                <ArtworkCard
                  id={artwork.id}
                  key={artwork.id}
                  thumbnailKey={thumbnail.key}
                  thumbnailSize={{
                    width: thumbnail.width,
                    height: thumbnail.height,
                  }}
                  minimal={minimal}
                />
              );
            })}
          </ArtworkGrid>
          {minimal && (
            <Link
              href={`/user/${user.username}`}
              className="text-light mt-8 flex w-full flex-row items-center justify-center gap-2 text-sm opacity-50 md:hidden"
            >
              <ArrowLeftIcon className="h-3 w-3" />
              Back to Duet
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
