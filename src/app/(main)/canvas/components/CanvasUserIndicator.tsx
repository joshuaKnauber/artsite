"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import { useOthers } from "./liveblocks.config";
import { TwicImg } from "@twicpics/components/react";

const CanvasUserIndicator = () => {
  const others = useOthers();

  const active = others.filter((user) => user.presence.cursor);

  return (
    <div className="absolute right-4 top-header z-10 mt-4 flex flex-row">
      {/* {active.map((user, i) => (
        <div
          className={`-mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-white border-opacity-20 bg-bg-600 z-[${
            i + 1
          }]`}
        >
          <TwicImg
            key={user.id}
            className="relative h-9 w-9 rounded-full"
            src={`/users/${user.presence.imageUrl?.split("/").slice(-1)[0] || ""}`}
          />
        </div>
      ))} */}
      <div
        className={`flex h-10 w-14 flex-row items-center justify-center gap-1 rounded-full border border-white border-opacity-20 bg-bg-600`}
      >
        <span className="text-sm font-medium text-white">
          {others.length + 1}
        </span>
        <UserIcon className="h-3 w-3" />
      </div>
    </div>
  );
};

export default CanvasUserIndicator;
