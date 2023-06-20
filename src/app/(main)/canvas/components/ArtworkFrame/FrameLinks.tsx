"use client";

import { Artwork } from "@/db/schema";
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { TwicImg } from "@twicpics/components/react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { panningAtom, scaleAtom } from "../atoms/canvasAtoms";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { isMobileOrTablet } from "@/utils/isMobile";

type FrameLinksProps = {
  artwork: Artwork;
  username?: string;
  profilePicture?: string;
};

const FrameLinks = ({ artwork, username, profilePicture }: FrameLinksProps) => {
  const scale = useAtomValue(scaleAtom);
  const panning = useAtomValue(panningAtom);

  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    const copyText = () => {
      copy(`${window.location.origin}/canvas/?a=${artwork.key}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    };

    if (isMobileOrTablet()) {
      try {
        window.navigator.share({
          title: artwork.title,
          text: "test",
          url: `${window.location.origin}/a/${artwork.key}`,
        });
      } catch (err) {
        copyText();
      }
    } else {
      copyText();
    }
  };

  const visible = scale > 0.5;

  return (
    <>
      {username && (
        <Link
          href={`/user/${username}`}
          target="_blank"
          className="absolute bottom-0 left-0 flex h-14 -translate-x-1/3 translate-y-1/3 flex-row items-center gap-4 rounded-full border border-white border-opacity-20 bg-bg-500 p-2 transition-all md:hover:bg-bg-600"
          style={{
            opacity: visible ? 1 : 0,
            pointerEvents: visible && !panning ? "auto" : "none",
          }}
        >
          <TwicImg
            className="aspect-square h-full rounded-full"
            src={`/users/${(profilePicture || "").split("/")[4]}`}
          />
          <span className="mr-2 text-lg">{username}</span>
        </Link>
      )}
      <div
        className="absolute bottom-0 right-0 flex translate-x-1/3 translate-y-1/3 flex-row items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible && !panning ? "auto" : "none",
        }}
      >
        <Link
          href={`/a/${artwork.key}`}
          target="_blank"
          className="flex aspect-square h-14 items-center justify-center rounded-full border border-white border-opacity-20 bg-bg-500 p-2 transition-all md:hover:bg-bg-600"
        >
          <ArrowTopRightOnSquareIcon className="h-6 w-6 text-white" />
        </Link>
        <button
          onClick={onCopy}
          className="relative flex aspect-square h-14 items-center justify-center rounded-full border border-white border-opacity-20 bg-bg-500 p-2 transition-all md:hover:bg-bg-600"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ShareIcon
              className="h-6 w-6 text-white transition-all"
              style={{
                transform: copied ? "rotate(90deg)" : "rotate(0deg)",
                opacity: copied ? 0 : 1,
              }}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <CheckIcon
              className="h-6 w-6 text-white transition-all"
              style={{
                transform: !copied ? "rotate(-90deg)" : "rotate(0deg)",
                opacity: !copied ? 0 : 1,
              }}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default FrameLinks;
