import { clerkClient } from "@clerk/nextjs";
import { Presence } from "./liveblocks.config";
import { User } from "@clerk/nextjs/dist/types/server";

type CanvasUserProps = {
  presence: Presence;
};

const CanvasUser = ({ presence }: CanvasUserProps) => {
  if (!presence.cursor) return null;

  let user: User | null = null;

  return (
    <div
      className="absolute"
      style={{
        top: presence.cursor.y,
        left: presence.cursor.x,
      }}
    >
      {user ? <span>{presence.userId}</span> : <span>{presence.userId}</span>}
    </div>
  );
};

export default CanvasUser;
