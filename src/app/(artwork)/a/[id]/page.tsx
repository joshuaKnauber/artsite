import db from "@/db";
import { artworks as artworksTable, images as imagesTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // const artworks =
  //   // await (await db.select().from(artworksTable)).where(eq(artworksTable.id, id))
  //   await db
  //     .select()
  //     .from(artworksTable)
  //     .where(eq(artworksTable.id, id))
  //     .rightJoin(imagesTable, eq(artworksTable.id, imagesTable.artwork_id));
  // console.log(artworks);

  const [artwork] = await db.query.artworks.findMany({
    with: { images: true },
    where: eq(artworksTable.id, id),
  });

  const artist = await clerkClient.users.getUser(artwork.user_id);

  return (
    <main className="flex flex-col">
      <h1>Artwork {artwork.title}</h1>
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
  );
}
