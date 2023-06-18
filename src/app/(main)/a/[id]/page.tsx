import db from "@/db";
import { artworks as artworksTable, images as imagesTable } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import DeleteBtn from "./components/DeleteBtn";
import Header from "@/app/components/Header/Header";
import Artwork from "./components/Artwork/Artwork";
import CommentSection from "./components/CommentSection";
import { PencilIcon } from "@heroicons/react/24/solid";
import EditMetaForm from "./components/EditMetaForm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const min = "" as unknown; // FIX searchParams where not working

  const artwork = await db.query.artworks.findFirst({
    where: eq(artworksTable.key, id),
  });

  return {
    title: artwork
      ? min === "1"
        ? `${artwork.title}`
        : `${artwork.title} | Duet`
      : "Duet",
  };
}

export default async function ArtworkPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { min: string; edit: string };
}) {
  const { id } = params;
  const { min, edit } = searchParams;
  const minimal = min === "1";
  let isEditing = edit === "1";

  const artwork = await db.query.artworks.findFirst({
    where: eq(artworksTable.key, id),
  });
  if (!artwork) throw new Error("Artwork not found");

  const images = await db.query.images.findMany({
    where: eq(imagesTable.artwork_id, artwork.id),
  });

  const user = await currentUser();

  const artist = await clerkClient.users.getUser(artwork.user_id);
  const isOwnArtwork = user?.id === artwork.user_id;
  isEditing = isEditing && isOwnArtwork;

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div
        className={`flex w-full flex-shrink-0 flex-col gap-12 overflow-y-auto p-4 md:sticky md:left-0 md:h-[100vh] md:w-sidebar md:px-8 md:py-8 ${
          minimal ? "md:top-0" : "md:top-header md:max-h-[calc(100vh-4rem)]"
        }`}
      >
        {isEditing && <EditMetaForm artwork={artwork} />}
        {!isEditing && (
          <div className="flex flex-col gap-4">
            {isOwnArtwork && !minimal && (
              <Link
                href={`/a/${artwork.key}?edit=1`}
                className="font.light flex w-fit flex-row items-center gap-2 rounded-md border border-white border-opacity-30 bg-white bg-opacity-0 px-4 py-1 text-sm opacity-75 md:hover:bg-opacity-5 md:hover:opacity-100"
              >
                <PencilIcon className="h-3 w-3" />
                Edit
              </Link>
            )}
            <h1 className="text-2xl font-medium leading-snug">
              {artwork.title}
            </h1>
            {artwork.description && (
              <span className="font-light leading-snug opacity-75">
                {artwork.description}
              </span>
            )}
            {(artwork.wip || (artwork.feedback && !minimal)) && !isEditing && (
              <div className="flex flex-row flex-wrap gap-4">
                {artwork.wip && (
                  <div className="flex h-7 w-fit flex-row items-center gap-3 rounded-full border border-purple-400 bg-purple-900 bg-opacity-10 px-3 text-sm font-light text-purple-400">
                    Work In Progress
                  </div>
                )}
                {artwork.feedback && !minimal && (
                  <div className="flex h-7 w-fit flex-row items-center gap-3 rounded-full border border-orange-400 bg-orange-900 bg-opacity-10 px-3 text-sm font-light text-orange-400">
                    Looking for feedback
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {!isEditing && (
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
        )}
        {!minimal && !isEditing && (
          <div className="hidden md:block">
            <CommentSection artworkId={artwork.id} />
            {isOwnArtwork && (
              <>
                <div className="my-8 h-0.5 w-full bg-bg-600"></div>
                <DeleteBtn id={artwork.id} />
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 px-4 md:flex-grow md:gap-8 md:bg-bg-400 md:px-16 md:py-8">
        {images.map((image) => (
          <Artwork
            withFeedback={artwork.feedback && !isEditing}
            image={image}
            key={image.id}
            minimal={minimal}
          />
        ))}
      </div>
      {!minimal && !isEditing && (
        <div className="block p-4 md:hidden">
          <CommentSection artworkId={artwork.id} />
        </div>
      )}
    </div>
  );
}
