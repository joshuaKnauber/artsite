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
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-[20ms] ease-linear"
      style={{
        top: presence.cursor.y,
        left: presence.cursor.x,
      }}
    >
      {/* {user ? <span>{presence.userId}</span> : <span>{presence.userId}</span>} */}
      <div className="h-8 w-8 rounded-full bg-red-500"></div>
    </div>
  );
};

export default CanvasUser;
