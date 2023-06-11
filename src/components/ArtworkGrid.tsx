"use client";

import Link from "next/link";
import { Masonry } from "react-plock";

type ArtworkGridProps = {
  artworks: any[];
};

const ArtworkGrid = ({ artworks }: ArtworkGridProps) => {
  artworks = [
    { id: 1, title: "Artwork 1" },
    { id: 2, title: "Artwork 2" },
    { id: 3, title: "Artwork 3" },
    { id: 4, title: "Artwork 4" },
    { id: 5, title: "Artwork 5" },
    { id: 6, title: "Artwork 6" },
    { id: 7, title: "Artwork 7" },
    { id: 8, title: "Artwork 8" },
    { id: 9, title: "Artwork 9" },
    { id: 10, title: "Artwork 10" },
    { id: 11, title: "Artwork 11" },
    { id: 12, title: "Artwork 12" },
    { id: 13, title: "Artwork 13" },
    { id: 14, title: "Artwork 14" },
    { id: 15, title: "Artwork 15" },
    { id: 16, title: "Artwork 16" },
    { id: 17, title: "Artwork 17" },
    { id: 18, title: "Artwork 18" },
    { id: 19, title: "Artwork 19" },
    { id: 20, title: "Artwork 20" },
  ];

  return (
    <div className="mx-auto">
      <Masonry
        items={artworks}
        config={{
          columns: [1, 2, 3],
          gap: [16, 16, 16],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => (
          <div key={idx} className="h-40 w-[400px] flex-grow bg-blue-400">
            {item.title}
          </div>
          // <img key={idx} src={item} style={{ width: "100%", height: "auto" }} />
        )}
      />
    </div>
  );
};

export default ArtworkGrid;
