"use client";

import { useUpdateMyPresence } from "./liveblocks.config";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./canvas.css";
import CanvasUsers from "./CanvasUsers";
import { useState } from "react";

type CanvasProps = {
  children?: React.ReactNode;
};

const Canvas = ({ children }: CanvasProps) => {
  const updateMyPresence = useUpdateMyPresence();

  const [state, setState] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1,
  });

  return (
    <div className="polka absolute bottom-0 left-0 right-0 top-header cursor-grab touch-none overflow-hidden">
      <TransformWrapper
        limitToBounds={false}
        maxScale={3}
        centerOnInit
        minScale={0.2}
        onTransformed={(e) => {
          setState({
            x: e.state.positionX,
            y: e.state.positionY,
            scale: e.state.scale,
          });
        }}
      >
        <div
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            if (!updateMyPresence) return;
            updateMyPresence({
              cursor: {
                x: (e.clientX - rect.left - state.x) / state.scale,
                y: (e.clientY - rect.top - state.y) / state.scale,
              },
            });
          }}
          onPointerLeave={() => updateMyPresence({ cursor: null })}
        >
          <TransformComponent>
            <CanvasUsers />
            {children}
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default Canvas;
