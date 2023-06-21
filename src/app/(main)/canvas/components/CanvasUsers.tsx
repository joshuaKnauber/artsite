"use client";

import CanvasReactions from "./CanvasReactions";
import CanvasUser from "./CanvasUser";
import { useOthers } from "./liveblocks.config";

type CanvasUsersProps = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

const CanvasUsers = ({ minX, minY, maxX, maxY }: CanvasUsersProps) => {
  const others = useOthers();

  return (
    <>
      <CanvasReactions />
      {others.map((user) => {
        if (!user.presence) return null;
        return (
          <CanvasUser
            connectionId={user.connectionId}
            minX={minX}
            minY={minY}
            maxX={maxX}
            maxY={maxY}
            key={user.presence.userId}
            presence={user.presence}
          />
        );
      })}
    </>
  );
};

export default CanvasUsers;
