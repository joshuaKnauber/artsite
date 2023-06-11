"use client";

import { ArtworkWithRelations } from "@/db/schema";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type ArtworkGridProps = {
  artworks: ArtworkWithRelations[];
};

const ArtworkGrid = ({ artworks }: ArtworkGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [gridItems, setGridItems] = useState<any[][]>([]);

  const MAX_ITEM_WIDTH = 500;

  const updateGridItems = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;

    const numColumns = Math.floor(containerWidth / MAX_ITEM_WIDTH);
    if (numColumns === 0) return;

    let items: any[][] = [];
    for (let i = 0; i < numColumns; i++) {
      items.push([]);
    }

    let itemIndex = 0;
    for (let i = 0; i < artworks.length; i++) {
      items[itemIndex].push(artworks[i]);
      itemIndex = (itemIndex + 1) % numColumns;
    }

    setGridItems(items);
  };

  useEffect(() => {
    window.addEventListener("resize", updateGridItems);
    updateGridItems();
    return () => window.removeEventListener("resize", updateGridItems);
  }, [artworks]);

  return (
    <div
      className="flex w-full flex-row items-start justify-center gap-4"
      ref={containerRef}
    >
      {gridItems.map((items, i) => (
        <div
          key={i}
          className="flex flex-grow flex-col gap-4"
          style={{
            maxWidth: MAX_ITEM_WIDTH,
          }}
        >
          {items.map((item, j) => (
            <Link
              href={`/a/${item.id}`}
              key={j}
              className={
                "flex w-full flex-grow flex-col gap-4 rounded-lg border border-white border-opacity-10 p-4"
              }
            >
              {item.images.length && (
                <img
                  src={`https://uploadthing.com/f/${item.images[0].key}`}
                  className="w-full rounded-lg"
                />
              )}
              <div>
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;
