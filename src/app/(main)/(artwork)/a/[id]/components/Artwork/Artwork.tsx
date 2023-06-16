"use client";

import { Image } from "@/db/schema";
import FeedbackOverlay from "./components/FeedbackOverlay";

type ArtworkProps = {
  image: Image;
  minimal?: boolean;
  withFeedback: boolean;
};

const Artwork = ({ image, minimal, withFeedback }: ArtworkProps) => {
  return (
    <div className="relative">
      {!minimal && withFeedback && <FeedbackOverlay image={image} />}
      <img
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
