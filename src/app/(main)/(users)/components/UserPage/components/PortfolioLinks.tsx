"use client";

import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

type PortfolioLinksProps = {
  username: string;
};

const PortfolioLinks = ({ username }: PortfolioLinksProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/u/${username}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-7 w-full flex-shrink-0 flex-row items-center gap-2">
        <Link
          className="text-white-400 flex h-full flex-grow items-center gap-2 rounded-md border border-white border-opacity-50 bg-white bg-opacity-5 px-2 text-sm font-light transition-all md:hover:border-opacity-100"
          href={`/u/${username}`}
        >
          <ArrowRightIcon className="h-3 w-3" />
          View your portfolio
        </Link>
        <button
          onClick={copyLink}
          className="text-white-400 flex aspect-square h-full items-center justify-center rounded-md border border-white border-opacity-50 bg-white bg-opacity-5 transition-all md:hover:border-opacity-100"
        >
          {copied ? (
            <ClipboardDocumentCheckIcon className="h-4 w-4" />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PortfolioLinks;
