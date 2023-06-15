import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import DeleteBtn from "./components/DeleteBtn";
import Header from "@/app/components/Header";
import Artwork from "./components/Artwork/Artwork";

export default async function ArtworkPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { min: string };
}) {
  const { id } = params;
  const { min } = searchParams;
  const minimal = min === "1";

  const [artwork] = await db.query.artworks.findMany({
    with: { images: true },
    where: eq(artworksTable.id, id),
  });

  const artist = await clerkClient.users.getUser(artwork.user_id);

  return (
    <>
      {!minimal && <Header />}
      <main className="flex w-full flex-col md:flex-row">
        <div
          className={`flex w-full flex-shrink-0 flex-col gap-8 overflow-y-auto p-4 md:sticky md:left-0 md:h-[100vh] md:w-sidebar md:px-8 md:py-8 ${
            minimal ? "md:top-0" : "md:top-header md:max-h-[calc(100vh-4rem)]"
          }`}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium leading-snug">
              {artwork.title}
            </h1>
            <span className="font-light leading-snug opacity-75">
              {artwork.description}
            </span>
          </div>
          {artwork.feedback && (
            <div className="flex w-fit flex-row items-center gap-3 rounded-full bg-orange-900 bg-opacity-10 px-4 py-1">
              <div className="h-1 w-1 rounded-full bg-orange-400"></div>
              <span className="text-sm text-orange-400">
                Looking for feedback on this
              </span>
            </div>
          )}
          <Link
            href={
              minimal ? `/u/${artist.username}` : `/user/${artist.username}`
            }
            className="flex flex-row gap-4"
          >
            <img
              src={artist.profileImageUrl}
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col gap-1.5">
              {artist.firstName || artist.lastName ? (
                <>
                  <span className="font-medium leading-none">
                    {artist.firstName} {artist.lastName}
                  </span>
                  <span className="text-sm font-light leading-none opacity-75">
                    @{artist.username}
                  </span>
                </>
              ) : (
                <span className="font-mediun leading-none">
                  @{artist.username}
                </span>
              )}
            </div>
          </Link>
          <DeleteBtn id={artwork.id} />
        </div>
        <div className="flex flex-col items-center gap-8 px-4 md:flex-grow md:bg-bg-400 md:px-16 md:py-8">
          {artwork.images.map((image) => (
            <Artwork image={image} key={image.id} />
          ))}
        </div>
      </main>
    </>
  );
}
