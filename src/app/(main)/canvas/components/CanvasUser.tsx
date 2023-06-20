"use client";

import { TwicImg } from "@twicpics/components/react";
import { Presence } from "./liveblocks.config";
import { useAtomValue } from "jotai";
import { scaleAtom } from "./atoms/canvasAtoms";
import { generateColor } from "@marko19907/string-to-color";

type CanvasUserProps = {
  presence: Presence;
  connectionId: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

const CanvasUser = ({
  presence,
  minX,
  maxX,
  maxY,
  minY,
  connectionId,
}: CanvasUserProps) => {
  const scale = useAtomValue(scaleAtom);

  if (!presence.cursor) return null;

  const padding = 20;
  const x = Math.max(
    minX + padding,
    Math.min(maxX - padding, presence.cursor.x)
  );
  const y = Math.max(
    minY + padding,
    Math.min(maxY - padding, presence.cursor.y)
  );

  const colorOptions = { saturation: 80, lightness: 40, alpha: 100 };
  const bgColor = generateColor(
    (presence.username || "") + connectionId.toString(),
    colorOptions
  );

  return (
    <div
      id={presence.username || ""}
      data-connection-id={connectionId}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-[20ms] ease-linear"
      style={{
        transform: `translate(${x + 10}px, ${y + 10}px)`,
      }}
    >
      <svg
        className="absolute left-[-12px] top-[-12px]"
        width="18"
        height="18"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.736264 5.96703C-0.637465 2.67008 2.67008 -0.637465 5.96703 0.736264L47.9571 18.2321C51.2646 19.6102 51.231 24.3076 47.9042 25.6383L33.5917 31.3633C32.5753 31.7699 31.7699 32.5753 31.3633 33.5917L25.6383 47.9042C24.3076 51.231 19.6102 51.2646 18.2321 47.9571L0.736264 5.96703Z"
          fill={bgColor}
        />
        <path
          d="M5.77473 1.1978L47.7648 18.6937C50.6588 19.8995 50.6295 24.0097 47.7185 25.1741L33.406 30.8991C32.2625 31.3565 31.3565 32.2625 30.8991 33.406L25.1741 47.7185C24.0097 50.6295 19.8995 50.6588 18.6937 47.7648L1.1978 5.77472C-0.00421047 2.88989 2.88989 -0.00421047 5.77473 1.1978Z"
          stroke="white"
          stroke-opacity="0.5"
        />
      </svg>

      {presence.userId ? (
        <div
          className="flex flex-row items-center gap-2 rounded-full border border-white border-opacity-20 bg-bg-600 p-0.5"
          style={{
            transform: `scale(${1 / scale})`,
            backgroundColor: bgColor,
          }}
        >
          <TwicImg
            className="h-6 w-6 rounded-full"
            src={`/users/${(presence.profileImgUrl || "").split("/")[4]}`}
          />
          {/* <span className="mx-2 my-1 leading-none">@{presence.username}</span> */}
        </div>
      ) : (
        <span>anonymous</span>
      )}
    </div>
  );
};

export default CanvasUser;
