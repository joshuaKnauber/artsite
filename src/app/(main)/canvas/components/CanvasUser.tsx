"use client";

import { TwicImg } from "@twicpics/components/react";
import { Presence } from "./liveblocks.config";
import { useAtomValue } from "jotai";
import { panningAtom, scaleAtom } from "./atoms/canvasAtoms";
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import Link from "next/link";

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
  const panning = useAtomValue(panningAtom);
  const scale = useAtomValue(scaleAtom);

  const [lastCursor, setLastCursor] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [color, setColor] = useState<string>("black");
  const [colorIsDark, setColorIsDark] = useState<boolean>(true);

  useEffect(() => {
    if (presence.cursor) {
      setLastCursor(presence.cursor);
    }
  }, [presence.cursor]);

  const updateColor = async () => {
    if (!presence.imageUrl) return;
    const key = presence.imageUrl?.split("/").splice(-1)[0];
    if (!key) return;
    const url = `https://duetimages.twic.pics/users/${key}?twic=v1/cover=50x50`;
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    setColor(color.hex);
    setColorIsDark(color.isDark);
  };

  useEffect(() => {
    updateColor();
  }, [presence]);

  if (!lastCursor) return null;

  const padding = 15;
  const x = Math.max(minX + padding, Math.min(maxX - padding, lastCursor.x));
  const y = Math.max(minY + padding, Math.min(maxY - padding, lastCursor.y));
  const outOfBounds = x !== lastCursor.x || y !== lastCursor.y;

  return (
    <Link
      href={`/user/${presence.username}`}
      target="_blank"
      id={presence.username || ""}
      data-connection-id={connectionId}
      className="z-10 transition-all duration-[20ms] ease-linear"
      style={{
        transformOrigin: "top left",
        transform: `translate(${x}px, ${y}px) scale(${1 / scale}) translate(${
          outOfBounds && lastCursor.x > x ? "-100%" : "0%"
        }, ${outOfBounds && lastCursor.y > y ? "-100%" : "0%"})`,
        opacity: presence.cursor ? 1 : 0.5,
        pointerEvents: !panning ? "auto" : "none",
      }}
    >
      <div
        style={{
          transform: `translate(${outOfBounds ? "0%, 0%" : "10px, 10px"})`,
        }}
      >
        {!outOfBounds && (
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
              fill={color}
            />
            <path
              d="M5.77473 1.1978L47.7648 18.6937C50.6588 19.8995 50.6295 24.0097 47.7185 25.1741L33.406 30.8991C32.2625 31.3565 31.3565 32.2625 30.8991 33.406L25.1741 47.7185C24.0097 50.6295 19.8995 50.6588 18.6937 47.7648L1.1978 5.77472C-0.00421047 2.88989 2.88989 -0.00421047 5.77473 1.1978Z"
              stroke="white"
              strokeOpacity="0.5"
            />
          </svg>
        )}
        {true ? (
          <div
            className="flex flex-row items-start gap-2 rounded-2xl border border-white border-opacity-20 bg-bg-600 p-0.5"
            style={{
              backgroundColor: color,
            }}
          >
            <TwicImg
              className="h-6 w-6 rounded-full"
              src={`/users/${
                (presence.imageUrl || "").split("/").slice(-1)[0]
              }`}
            />
            {presence.chat && !outOfBounds && (
              <div
                className={`my-1 ml-1 mr-3 flex flex-col gap-1 ${
                  colorIsDark ? "text-white" : "text-black"
                }`}
              >
                <span className="text-xs font-medium leading-none">
                  {presence.username || "Anonymous"}
                </span>
                <span className="max-w-md text-sm font-light leading-tight">
                  {presence.chat}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex h-7 w-7 flex-row items-start gap-2 rounded-2xl border border-white border-opacity-20 bg-bg-600 p-0.5"
            style={{
              backgroundColor: color,
            }}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default CanvasUser;
