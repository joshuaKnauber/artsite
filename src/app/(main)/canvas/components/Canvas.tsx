"use client";

import { useUpdateMyPresence } from "./liveblocks.config";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./canvas.css";
import CanvasUsers from "./CanvasUsers";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

type CanvasProps = {
  children?: React.ReactNode;
};

const Canvas = ({ children }: CanvasProps) => {
  const updateMyPresence = useUpdateMyPresence();
  const { user } = useUser();

  const [state, setState] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const refWrapper = useRef<HTMLDivElement>(null);

  const bounds = useMemo(() => {
    if (!refWrapper.current)
      return {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
      };
    return {
      minX: -state.x / state.scale,
      minY: -state.y / state.scale,
      maxX: (-state.x + refWrapper.current.clientWidth) / state.scale,
      maxY: (-state.y + refWrapper.current.clientHeight) / state.scale,
    };
  }, [state]);

  useEffect(() => {
    updateMyPresence({
      userId: user?.id || null,
      username: user?.username || null,
      profileImgUrl: user?.profileImageUrl || null,
    });
  }, [user]);

  return (
    <div
      className="polka absolute bottom-0 left-0 right-0 top-header cursor-grab touch-none overflow-hidden"
      ref={refWrapper}
      style={{
        backgroundPositionX: state.x,
        backgroundPositionY: state.y,
      }}
    >
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
            <CanvasUsers scale={state.scale} {...bounds} />
            {children}
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default Canvas;
