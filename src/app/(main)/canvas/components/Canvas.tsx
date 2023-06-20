"use client";

import { useUpdateMyPresence } from "./liveblocks.config";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import "./canvas.css";
import CanvasUsers from "./CanvasUsers";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAtom, useSetAtom } from "jotai";
import {
  mousePosAtom,
  panningAtom,
  posXAtom,
  posYAtom,
  scaleAtom,
} from "./atoms/canvasAtoms";
import { useSearchParams } from "next/navigation";

type CanvasProps = {
  children?: React.ReactNode;
};

const Canvas = ({ children }: CanvasProps) => {
  const searchParams = useSearchParams();
  const paramArtwork = searchParams.get("a") || null;
  const paramUser = searchParams.get("u") || null;

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const refWrapper = useRef<HTMLDivElement>(null);

  const updateMyPresence = useUpdateMyPresence();
  const { user } = useUser();

  const [posX, setPosX] = useAtom(posXAtom);
  const [posY, setPosY] = useAtom(posYAtom);
  const [scale, setScale] = useAtom(scaleAtom);

  const tempPanning = useRef<boolean>(false);
  const setPanning = useSetAtom(panningAtom);

  const setMousePos = useSetAtom(mousePosAtom);

  const bounds = useMemo(() => {
    if (!refWrapper.current)
      return {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
      };
    return {
      minX: -posX / scale,
      minY: -posY / scale,
      maxX: (-posX + refWrapper.current.clientWidth) / scale,
      maxY: (-posY + refWrapper.current.clientHeight) / scale,
    };
  }, [posX, posY, scale]);

  const goToElement = (element: Element) => {
    const { x, y, width, height } = element.getBoundingClientRect();
    const wrapperRect = refWrapper.current?.getBoundingClientRect();
    if (!wrapperRect) return;
    const centerX = -x + wrapperRect.width / 2 - width / 2;
    const centerY = -y + wrapperRect.height / 2 - height / 2 + wrapperRect.top;
    transformComponentRef.current?.setTransform(centerX, centerY, 1);
  };

  const goToId = (id: string, tries = 0) => {
    const element = document.getElementById(id);
    if (element) {
      goToElement(element);
    } else {
      if (tries < 10) {
        setTimeout(() => {
          goToId(id, tries + 1);
        }, 100);
      }
    }
  };

  useEffect(() => {
    const id = paramArtwork || paramUser;
    if (id) {
      goToId(id);
    }
  }, [paramArtwork, paramUser]);

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
        backgroundPositionX: posX,
        backgroundPositionY: posY,
      }}
    >
      <TransformWrapper
        ref={transformComponentRef}
        limitToBounds={false}
        maxScale={3}
        centerOnInit
        minScale={0.2}
        onTransformed={(e) => {
          setPosX(e.state.positionX);
          setPosY(e.state.positionY);
          setScale(e.state.scale);
        }}
        onPanningStart={() => {
          tempPanning.current = true;
          setTimeout(() => {
            if (tempPanning.current) setPanning(true);
          }, 100);
        }}
        onPanningStop={() => {
          tempPanning.current = false;
          setPanning(false);
        }}
      >
        <div
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX, y: e.clientY - rect.top });
            if (!updateMyPresence) return;
            updateMyPresence({
              cursor: {
                x: (e.clientX - rect.left - posX) / scale,
                y: (e.clientY - rect.top - posY) / scale,
              },
            });
          }}
          onPointerLeave={() => updateMyPresence({ cursor: null })}
        >
          <TransformComponent>
            <CanvasUsers {...bounds} />
            {children}
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default Canvas;
