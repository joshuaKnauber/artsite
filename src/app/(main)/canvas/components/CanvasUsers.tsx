"use client";

import CanvasUser from "./CanvasUser";
import { useOthers } from "./liveblocks.config";

type CanvasUsersProps = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  scale: number;
};

const CanvasUsers = ({ minX, minY, maxX, maxY, scale }: CanvasUsersProps) => {
  const others = useOthers();

  return (
    <>
      {others.map((user) => {
        if (!user.presence) return null;
        return (
          <CanvasUser
            minX={minX}
            minY={minY}
            maxX={maxX}
            maxY={maxY}
            scale={scale}
            key={user.presence.userId}
            presence={user.presence}
          />
        );
      })}
    </>
  );
};

export default CanvasUsers;
