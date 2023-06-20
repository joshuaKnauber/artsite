"use client";

import { useAtomValue } from "jotai";
import { mousePosAtom } from "./atoms/canvasAtoms";
import { useEffect, useState } from "react";
import { useBroadcastEvent, useEventListener } from "./liveblocks.config";

const CanvasInteractions = () => {
  const mousePos = useAtomValue(mousePosAtom);
  const [fixedMousePos, setFixedMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showInteractions, setShowInteractions] = useState<boolean>(false);

  const broadcast = useBroadcastEvent();

  useEventListener(({ connectionId, event }) => {
    if (event.type === "EMOJI") {
      alert(`${connectionId} sent ${event.emoji}`);
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      window.localStorage.setItem("seenCanvasHelp", "true");
      setShowHelp(false);
      e.preventDefault();
      e.stopPropagation();
      setFixedMousePos(mousePos);
      setShowInteractions(true);
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("seenCanvasHelp")) {
      setShowHelp(true);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mousePos]);

  return (
    <>
      {showHelp && (
        <div
          className="pointer-events-none fixed z-20 hidden h-6 items-center justify-center rounded-md border border-white border-opacity-20 bg-bg-600 px-2 text-xs leading-none tracking-wider text-white text-opacity-50 md:flex"
          style={{
            transform: `translate(${mousePos.x + 20}px, ${mousePos.y - 12}px)`,
          }}
        >
          Press [SPACE]
        </div>
      )}
      {showInteractions && (
        <>
          <div
            className="fixed bg-red-400 bg-opacity-20 p-4"
            style={{
              transform: `translate(calc(${fixedMousePos.x}px - 50%), calc(${fixedMousePos.y}px - 50%))`,
            }}
            onMouseLeave={() => setShowInteractions(false)}
          >
            <div className="flex flex-row items-center gap-2 rounded-md border border-white border-opacity-20 bg-bg-600 p-2">
              <button onClick={() => broadcast({ type: "EMOJI", emoji: "😍" })}>
                😍
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CanvasInteractions;
