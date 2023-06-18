"use client";

import { useDrag, usePinch, useWheel } from "@use-gesture/react";
import { useState } from "react";
import { useUpdateMyPresence } from "./liveblocks.config";
import "./canvas.css";

type CanvasProps = {
  children?: React.ReactNode;
};

const Canvas = ({ children }: CanvasProps) => {
  const updateMyPresence = useUpdateMyPresence();

  const [lastOffset, setLastOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [lastZoom, setLastZoom] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(0.2);

  const bindDrag = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      setOffset({
        x: lastOffset.x + mx,
        y: lastOffset.y + my,
      });
    } else {
      setLastOffset({
        x: lastOffset.x + mx,
        y: lastOffset.y + my,
      });
    }
  });

  const bindWheel = useWheel(
    ({ event, delta: [dx, dy], movement: [mx, my] }) => {
      console.log(offset);
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newZoom = Math.min(3, Math.max(0.1, zoom + my * 0.001));
      setZoom(newZoom);

      // const offsetX = x - (x - offset.x) * scale;
      // const offsetY = y - (y - offset.y) * scale;

      // setOffset({ x: offsetX, y: offsetY });
    }
  );

  const bindPinch = usePinch(({ da: [d, a], origin: [x, y] }) => {
    const newZoom = zoom * d;
    setZoom(newZoom);

    const offsetX = x - (x - offset.x) * d;
    const offsetY = y - (y - offset.y) * d;

    setOffset({ x: offsetX, y: offsetY });
  });

  return (
    <div
      {...bindDrag()}
      //   {...bindWheel()}
      className="polka absolute bottom-0 left-0 right-0 top-header cursor-grab touch-none overflow-hidden"
      style={{
        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      //   onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      <div
        style={{
          transform: `translate(calc(calc(-50% + 50vw) + ${offset.x}px), calc(calc(calc(-50% + 50dvh) - 4rem) + ${offset.y}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Canvas;
