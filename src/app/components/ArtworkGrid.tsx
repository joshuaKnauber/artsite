"use client";

import { useRef, useState, useEffect } from "react";

type ArtworkGridProps = {
  children: React.ReactNode[];
};

const ArtworkGrid = ({ children }: ArtworkGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [gridItems, setGridItems] = useState<React.ReactNode[][]>([]);

  const MAX_ITEM_WIDTH = 500;

  const updateGridItems = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;

    const numColumns = Math.max(1, Math.floor(containerWidth / MAX_ITEM_WIDTH));

    let items: React.ReactNode[][] = [];
    for (let i = 0; i < numColumns; i++) {
      items.push([]);
    }

    let itemIndex = 0;
    for (let i = 0; i < children.length; i++) {
      items[itemIndex].push(children[i]);
      itemIndex = (itemIndex + 1) % numColumns;
    }

    setGridItems(items);
  };

  useEffect(() => {
    window.addEventListener("resize", updateGridItems);
    updateGridItems();
    return () => window.removeEventListener("resize", updateGridItems);
  }, [children]);

  return (
    <div
      className="flex w-full flex-row items-start justify-center gap-6"
      ref={containerRef}
    >
      {gridItems.map((items, i) => (
        <div
          key={i}
          className="flex flex-grow flex-col gap-6"
          style={{
            maxWidth: MAX_ITEM_WIDTH,
          }}
        >
          {items}
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;
