"use client";

import CanvasUser from "./CanvasUser";
import { useOthers } from "./liveblocks.config";

const CanvasUsers = () => {
  const others = useOthers();

  return (
    <>
      {others.map((user) => {
        if (!user.presence) return null;
        return <CanvasUser presence={user.presence} key={user.connectionId} />;
      })}
    </>
  );
};

export default CanvasUsers;
