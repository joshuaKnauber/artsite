"use client";

import { Image } from "@/db/schema";
import FeedbackOverlay from "./components/FeedbackOverlay";
import { TwicImg } from "@twicpics/components/react";
import { useInView } from "react-intersection-observer";

type ArtworkProps = {
  image: Image;
  minimal?: boolean;
  withFeedback: boolean;
  className?: string;
};

const Artwork = ({ image, minimal, withFeedback, className }: ArtworkProps) => {
  const { ref, inView } = useInView();

  return (
    <div ref={ref}>
      <TwicImg
        className={className}
        src={`/art/${image.key}`}
        ratio={image.width / image.height}
      />
      {!minimal && withFeedback && inView && <FeedbackOverlay image={image} />}
    </div>
  );
};

export default Artwork;
