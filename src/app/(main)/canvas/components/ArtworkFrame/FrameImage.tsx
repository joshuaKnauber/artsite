"use client";

import Artwork from "@/app/(main)/a/[id]/components/Artwork/Artwork";
import { Image } from "@/db/schema";
import { scaleAtom } from "../atoms/canvasAtoms";
import { useAtomValue } from "jotai";

type FrameImageProps = {
  thumbnail: Image;
  width: number;
  height: number
};

const FrameImage = ({ thumbnail, width, height }: FrameImageProps) => {
  const scale = useAtomValue(scaleAtom);

  const visible = scale > 0.5;

  return <Artwork image={thumbnail} withFeedback={visible} className={`h-[${height}px] w-[${width}px]`} />;
};

export default FrameImage;
