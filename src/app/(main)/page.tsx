import { currentUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types";
import InviteForm from "@/app/components/InviteForm";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import ArtworkGrid from "@/app/components/ArtworkGrid";
import ArtworkCard from "../components/ArtworkCard";
import Header from "../components/Header";
import Link from "next/link";

export default async function HomePage() {
  const user = (await currentUser()) as ClerkUser | null;

  if (!user) {
    return (
      <main className="flex w-full flex-col items-center gap-8 px-4 pt-[30vh]">
        <span className="flex h-5 flex-col justify-center rounded-md border border-blue-200 bg-blue-800 bg-opacity-10 px-2 text-xs leading-none text-blue-200">
          CLOSED BETA
        </span>
        <span className="text-2xl opacity-75">
          {"Hey, something great is coming here!"}
        </span>
        <span className="max-w-lg rounded-lg border border-blue-400 bg-blue-800 bg-opacity-10 p-6 text-center font-light text-blue-400">
          We're building things behind the scenes for now, but you can already
          sign up and participate if you have an invite code!
        </span>
        <Link
          href="/sign-up"
          className="flex h-8 w-fit flex-row items-center justify-center rounded-full border border-zinc-200 bg-zinc-500 bg-opacity-10 px-10 text-sm font-medium leading-none text-zinc-200 transition-all md:hover:bg-opacity-30"
        >
          Sign Up
        </Link>
      </main>
    );
  }

  if (!user.publicMetadata.unlocked) {
    return (
      <main className="flex w-full flex-col items-center gap-8 px-4 pt-[30vh]">
        <span className="flex h-5 flex-col justify-center rounded-md border border-blue-200 bg-blue-800 bg-opacity-10 px-2 text-xs leading-none text-blue-200">
          CLOSED BETA
        </span>
        <span className="text-2xl opacity-75">{"Hey, you'll be in soon!"}</span>
        <InviteForm />
      </main>
    );
  }

  const artworks = await db.query.artworks.findMany({
    with: { images: true },
    columns: { id: true, title: true, user_id: true },
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <>
      <Header />
      <main className="flex w-full flex-col">
        <div className="flex w-full px-4 py-4 md:px-8 md:py-8">
          <ArtworkGrid>
            {artworks.map((artwork) => {
              const thumbnail =
                artwork.images.find((img) => img.is_thumbnail) ||
                artwork.images[0];
              return (
                <ArtworkCard
                  id={artwork.id}
                  key={artwork.id}
                  artistId={artwork.user_id}
                  thumbnailKey={thumbnail.key}
                  thumbnailSize={{
                    width: thumbnail.width,
                    height: thumbnail.height,
                  }}
                />
              );
            })}
          </ArtworkGrid>
        </div>
      </main>
    </>
  );
}
