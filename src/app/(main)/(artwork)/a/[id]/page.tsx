import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import DeleteBtn from "../components/DeleteBtn";
import Header from "@/app/components/Header";

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
      <main className="flex w-full flex-col">
        <h1>Artwork {artwork.title}</h1>
        <DeleteBtn id={artwork.id} />
        <span>{artwork.description}</span>
        <Link href={`/user/${artist.username}`}>{artist.username}</Link>
        {artwork.images.map((image) => (
          <img
            className="w-48"
            src={`https://uploadthing.com/f/${image.key}`}
            key={image.id}
          />
        ))}
      </main>
    </>
  );
}
