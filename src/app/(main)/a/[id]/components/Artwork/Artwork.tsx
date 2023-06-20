"use client";

import { Image } from "@/db/schema";
import FeedbackOverlay from "./components/FeedbackOverlay";
import { TwicImg } from "@twicpics/components/react";

type ArtworkProps = {
  image: Image;
  minimal?: boolean;
  withFeedback: boolean;
  className?: string;
};

const Artwork = ({ image, minimal, withFeedback, className }: ArtworkProps) => {
  return (
    <>
      <TwicImg
        className={className}
        src={`/art/${image.key}`}
        ratio={image.width / image.height}
      />
      {!minimal && withFeedback && <FeedbackOverlay image={image} />}
    </>
  );
};

export default Artwork;
