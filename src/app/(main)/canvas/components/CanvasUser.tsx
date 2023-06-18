"use client";

import { TwicImg } from "@twicpics/components/react";
import { Presence } from "./liveblocks.config";

type CanvasUserProps = {
  presence: Presence;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  scale: number;
};

const CanvasUser = ({
  presence,
  minX,
  maxX,
  maxY,
  minY,
  scale,
}: CanvasUserProps) => {
  if (!presence.cursor) return null;

  const padding = 20;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-[20ms] ease-linear"
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
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-0.5"
          style={{
            transform: `scale(${1 / scale})`,
          }}
        >
          <TwicImg
            className="w-full rounded-full"
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
