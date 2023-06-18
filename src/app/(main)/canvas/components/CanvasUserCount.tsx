"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import { useOthers } from "./liveblocks.config";

const CanvasUserCount = () => {
  const others = useOthers();
  return (
    <div className="absolute right-4 top-header z-10 mt-4">
      <div className="flex h-10 w-10 flex-row items-center justify-center gap-1 rounded-full bg-bg-600">
        <span className="text-sm font-medium text-white">
          {others.length + 1}
        </span>
        <UserIcon className="h-3 w-3" />
      </div>
    </div>
  );
};

export default CanvasUserCount;
