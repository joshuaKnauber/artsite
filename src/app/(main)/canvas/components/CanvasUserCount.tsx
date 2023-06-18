"use client";

import { useOthers } from "./liveblocks.config";

const CanvasUserCount = () => {
  const others = useOthers();
  return (
    <div className="absolute right-4 top-header z-10">
      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg-600">
        <span className="text-lg text-white">{others.length + 1}</span>
      </div>
    </div>
  );
};

export default CanvasUserCount;
