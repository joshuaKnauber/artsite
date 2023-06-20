import { Metadata } from "next";
import Canvas from "./components/Canvas";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import CanvasItem from "./components/CanvasItem";
import CanvasContext from "./components/CanvasContext";
import CanvasUserCount from "./components/CanvasUserCount";
import ArtworkFrame from "./components/ArtworkFrame/ArtworkFrame";

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
        <div
          className="pointer-events-none h-[200vh] w-[200vw]"
          aria-hidden
        ></div>
        {artworks.map((a, i) => (
          <CanvasItem key={a.id} x={i * 800} y={i * 800} id={a.key}>
            <ArtworkFrame artwork={a} />
          </CanvasItem>
        ))}
      </Canvas>
      <CanvasUserCount />
    </CanvasContext>
  );
}
