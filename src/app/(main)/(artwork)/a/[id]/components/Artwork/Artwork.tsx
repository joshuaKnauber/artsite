"use client";

import { Image } from "@/db/schema";
import FeedbackOverlay from "./components/FeedbackOverlay";
import { useState } from "react";

type ArtworkProps = {
  image: Image;
  minimal?: boolean;
  withFeedback: boolean;
};

const Artwork = ({ image, minimal, withFeedback }: ArtworkProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="relative">
      {!minimal && withFeedback && imageLoaded && (
        <FeedbackOverlay image={image} />
      )}
      <img
        onLoad={() => setImageLoaded(true)}
        className="w-full md:max-h-[calc(100vh-8rem)] md:w-auto"
        src={`https://uploadthing.com/f/${image.key}`}
        style={{
          aspectRatio: image.height ? image.width / image.height : 1,
        }}
      />
    </div>
  );
};

export default Artwork;
