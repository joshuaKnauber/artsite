"use client";

import { TwicImg } from "@twicpics/components/react";
import { Presence } from "./liveblocks.config";
import { useAtomValue } from "jotai";
import { scaleAtom } from "./atoms/canvasAtoms";

type CanvasUserProps = {
  presence: Presence;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

const CanvasUser = ({ presence, minX, maxX, maxY, minY }: CanvasUserProps) => {
  const scale = useAtomValue(scaleAtom);

  if (!presence.cursor) return null;

  const padding = 20;
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-[20ms] ease-linear"
      style={{
        top: Math.max(
          minY + padding,
          Math.min(maxY - padding, presence.cursor.y)
        ),
        left: Math.max(
          minX + padding,
          Math.min(maxX - padding, presence.cursor.x)
        ),
      }}
    >
      {presence.userId ? (
        <div
          className="flex h-7 flex-row items-center gap-1 rounded-full bg-white p-0.5"
          style={{
            transform: `scale(${1 / scale})`,
          }}
        >
          <TwicImg
            className="h-7 w-7 rounded-full"
            src={`/users/${(presence.profileImgUrl || "").split("/")[4]}`}
          />
        </div>
      ) : (
        <span>anonymous</span>
      )}
    </div>
  );
};

export default CanvasUser;
