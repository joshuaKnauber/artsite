"use client";

import { useUser } from "@clerk/nextjs";
import { RoomProvider } from "./liveblocks.config";

type CanvasContextProps = {
  children?: React.ReactNode;
};

const CanvasContext = ({ children }: CanvasContextProps) => {
  const { user } = useUser();

  return (
    <RoomProvider
      id="canvas"
      initialPresence={{
        cursor: null,
        userId: user?.id || null,
        username: user?.username || null,
        profileImgUrl: user?.profileImageUrl || null,
      }}
    >
      {children}
    </RoomProvider>
  );
};

export default CanvasContext;
