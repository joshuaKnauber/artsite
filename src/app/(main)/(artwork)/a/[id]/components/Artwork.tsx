"use client";

import { Image } from "@/db/schema";
import { useClerk } from "@clerk/nextjs";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

type ArtworkProps = {
  image: Image;
};

const Artwork = ({ image }: ArtworkProps) => {
  const { user } = useClerk();

  const refContainer = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [inSelection, setInSelection] = useState<boolean>(false);

  const onClickFeedback = () => {
    setInSelection(true);
  };

  const onClickImg = () => {
    if (!inSelection || !refContainer.current) return;
    setInSelection(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = refContainer.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos([e.clientX - rect.left, e.clientY - rect.top]);
  };

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inSelection) return;
    e.preventDefault();
    setInSelection(false);
  };

  const onImgLeave = () => {
    setInSelection(false);
  };

  return (
    <div className="relative" ref={refContainer}>
      {user && (
        <>
          <div
            className="pointer-events-none absolute origin-bottom-left rounded-full rounded-bl-sm bg-white p-1 shadow-md transition-all"
            style={{
              left: mousePos[0],
              top: mousePos[1] - 32,
              scale: inSelection ? 1 : 0,
            }}
          >
            <img
              src={user.profileImageUrl}
              className="h-6 w-6 flex-shrink-0 rounded-full"
            />
          </div>
          <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2">
            <button
              onClick={onClickFeedback}
              className="hidden h-8 w-8 items-center justify-center rounded-md bg-black bg-opacity-50 transition-all md:flex md:hover:bg-opacity-60"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
      <img
        className={`mb-4 w-full md:mb-0 md:max-h-[calc(100vh-4rem)] md:w-auto ${
          inSelection ? "cursor-none" : ""
        }`}
        onMouseMove={onMouseMove}
        onClick={onClickImg}
        onContextMenu={onRightClick}
        onMouseLeave={onImgLeave}
        src={`https://uploadthing.com/f/${image.key}`}
        style={{
          aspectRatio: image.height ? image.width / image.height : 1,
        }}
      />
    </div>
  );
};

export default Artwork;
