"use client";

import { useClerk } from "@clerk/nextjs";
import { RoomProvider } from "./liveblocks.config";

type CanvasContextProps = {
  children?: React.ReactNode;
};

const CanvasContext = ({ children }: CanvasContextProps) => {
  const { user } = useClerk();

  return (
    <RoomProvider
      id="canvas"
      initialPresence={{ cursor: null, userId: user?.id || null }}
    >
      {children}
    </RoomProvider>
  );
};

export default CanvasContext;
