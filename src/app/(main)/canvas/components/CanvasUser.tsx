import { TwicImg } from "@twicpics/components/react";
import { Presence } from "./liveblocks.config";

type CanvasUserProps = {
  presence: Presence;
};

const CanvasUser = ({ presence }: CanvasUserProps) => {
  if (!presence.cursor) return null;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-[20ms] ease-linear"
      style={{
        top: presence.cursor.y,
        left: presence.cursor.x,
      }}
    >
      {presence.userId ? (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white p-0.5">
          <TwicImg
            className="w-full rounded-full"
            src={`/users/${(presence.profileImgUrl || "").split("/")[4]}`}
          />
        </div>
      ) : (
        <span>anonymous</span>
      )}
    </div>
  );
};

export default CanvasUser;
