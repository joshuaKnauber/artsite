import { Metadata } from "next";
import Canvas from "./components/Canvas";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import CanvasItem from "./components/CanvasItem";
import ArtworkDisplay from "./components/ArtworkDisplay";
import CanvasContext from "./components/CanvasContext";
import CanvasUsers from "./components/CanvasUsers";
import CanvasUserCount from "./components/CanvasUserCount";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function CanvasPage() {
  const artworks = await db.query.artworks.findMany({
    orderBy: desc(artworksTable.created_at),
  });

  return (
    <CanvasContext>
      <Canvas>
        <CanvasItem
          x={0}
          y={0}
          className={"flex flex-row flex-wrap items-center gap-[200px]"}
        >
          {artworks.map((a, i) => (
            <ArtworkDisplay key={a.id} artwork={a} />
          ))}
        </CanvasItem>
      </Canvas>
      <CanvasUserCount />
    </CanvasContext>
  );
}
