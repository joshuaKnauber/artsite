import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { min: string };
}): Promise<Metadata> {
  const id = params.id;
  const min = searchParams?.min;

  const [artwork] = await db.query.artworks.findMany({
    where: eq(artworksTable.id, id),
    columns: { title: true },
  });

  return {
    title: artwork
      ? min === "1"
        ? `${artwork.title}`
        : `${artwork.title} | Duet`
      : "Duet",
  };
}

export default function ArtworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
