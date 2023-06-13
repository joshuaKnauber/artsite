"use client";

import {
  CheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  LinkIcon,
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
    <div className="flex h-8 w-full flex-shrink-0 flex-row items-center gap-2">
      <Link
        className="flex h-full flex-grow items-center gap-2 rounded-md border border-amber-400 border-opacity-50 bg-amber-900 bg-opacity-10 px-2 text-sm font-light text-amber-400 transition-all md:hover:border-opacity-100"
        href={`/u/${username}`}
      >
        <ArrowRightIcon className="h-3 w-3" />
        View your portfolio
      </Link>
      <button
        onClick={copyLink}
        className="flex aspect-square h-full items-center justify-center rounded-md border border-amber-400 border-opacity-50 bg-amber-900 bg-opacity-10 text-amber-400 transition-all md:hover:border-opacity-100"
      >
        {copied ? (
          <ClipboardDocumentCheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardDocumentIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default PortfolioLinks;
