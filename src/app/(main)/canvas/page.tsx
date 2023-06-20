import { Metadata } from "next";
import Canvas from "./components/Canvas";
import db from "@/db";
import { artworks as artworksTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import CanvasItem from "./components/CanvasItem";
import CanvasContext from "./components/CanvasContext";
import CanvasUserIndicator from "./components/CanvasUserIndicator";
import ArtworkFrame from "./components/ArtworkFrame/ArtworkFrame";
import CanvasInteractions from "./components/CanvasInteractions";
import { generateSpiral } from "./components/utils/spiral";
import { randomSeeded } from "./components/utils/randomSeeded";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function CanvasPage() {
  const artworks = await db.query.artworks.findMany({
    orderBy: desc(artworksTable.created_at),
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
            x={x * 1500 + (randomSeeded(i + x) - 0.5) * 400}
            y={y * 1500 + (randomSeeded(i + y) - 0.5) * 400}
            id={artworks[i].key}
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
