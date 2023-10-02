import { Metadata } from "next";
import Canvas from "./components/Canvas";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import CanvasItem from "./components/CanvasItem";
import CanvasContext from "./components/CanvasContext";
import CanvasUserIndicator from "./components/CanvasUserIndicator";
import ArtworkFrame from "./components/ArtworkFrame/ArtworkFrame";
import CanvasInteractions from "./components/CanvasInteractions";
import { generateSpiral } from "./components/utils/spiral";
import { randomSeeded } from "./components/utils/randomSeeded";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Canvas | Duet",
};

export default async function CanvasPage() {
  const artworks = await db.query.artworks.findMany({
    orderBy: asc(artworksTable.created_at),
  });

  const spiral = generateSpiral(artworks.length);

  return (
    <CanvasContext>
      <Canvas>
        <div
          className="pointer-events-none h-[200vh] w-[200vw]"
          aria-hidden
        ></div>
        {spiral.map(([x, y], i) => (
          <CanvasItem
            key={artworks[i].id}
            x={x * 1500}
            y={y * 1500}
            id={artworks[i].id}
          >
            <ArtworkFrame artwork={artworks[i]} />
          </CanvasItem>
        ))}
      </Canvas>
      <CanvasUserIndicator />
      <CanvasInteractions />
    </CanvasContext>
  );
}
