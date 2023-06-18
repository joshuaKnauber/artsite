"use client";

import { Image } from "@/db/schema";
import FeedbackOverlay from "./components/FeedbackOverlay";
import { TwicImg } from "@twicpics/components/react";

type ArtworkProps = {
  image: Image;
  minimal?: boolean;
  withFeedback: boolean;
};

const Artwork = ({ image, minimal, withFeedback }: ArtworkProps) => {
  return (
    <div className="w-full">
      <div
        className="relative mx-auto md:max-h-[calc(100vh-8rem)] md:w-auto"
        style={{
          aspectRatio: image.width / image.height,
        }}
      >
        <TwicImg
          className="w-full"
          src={`/art/${image.key}`}
          ratio={image.width / image.height}
        />
        {!minimal && withFeedback && <FeedbackOverlay image={image} />}
      </div>
    </div>
  );
};

export default Artwork;
