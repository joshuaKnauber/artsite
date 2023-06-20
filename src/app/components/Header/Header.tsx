"use client";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import NotificationBell from "./NotificationBell";
import { usePathname, useSearchParams } from "next/navigation";
import { TwicImg } from "@twicpics/components/react";
import {
  ArrowUpTrayIcon,
  Bars3BottomLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = () => {
  const { user } = useClerk();

  const [showNav, setShowNav] = useState<boolean>(false);

  const path = usePathname();
  const searchParams = useSearchParams();
  const min = searchParams.get("min") || "0";

  const HIDE_PATHS = [/\/u\/.*/];
  if (HIDE_PATHS.some((p) => p.test(path)) || min === "1") return null;

  return (
    <header className="sticky left-0 top-0 z-40 flex h-header w-full flex-row items-center justify-between border-b border-b-white border-opacity-10 bg-bg-500 px-4 md:px-8">
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-row items-center gap-4">
          <button
            className="flex h-8 w-8 flex-row items-center md:hidden"
            onClick={() => setShowNav(!showNav)}
          >
            <Bars3BottomLeftIcon className="h-6 w-6 text-white" />
          </button>
          <Link className="font-semibold leading-none" href="/">
            Duet
          </Link>
          <span className="flex h-5 flex-col justify-center rounded-md border border-blue-200 bg-blue-800 bg-opacity-10 px-2 text-xs leading-none text-blue-200">
            BETA
          </span>
        </div>
      </div>
      <div className="hidden flex-row items-center gap-8 md:flex">
        <Link
          href="/"
          className={`${path === "/" ? "opacity-100" : "opacity-50"}`}
        >
          Home
        </Link>
        <Link href="/canvas" className="flex flex-row items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="absolute left-0 top-0 h-2 w-2 animate-ping rounded-full bg-red-500"></div>
          </div>
          <span
            className={`${path === "/canvas" ? "opacity-100" : "opacity-50"}`}
          >
            Canvas
          </span>
        </Link>
      </div>
      {user ? (
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/upload"
            className="flex h-8 flex-row items-center rounded-full border border-white bg-white bg-opacity-0 px-5 text-sm leading-none text-white transition-all md:hover:bg-opacity-5"
          >
            <span className="hidden md:block">Upload</span>
            <ArrowUpTrayIcon className="h-4 w-4 md:hidden" />
          </Link>
          <NotificationBell />
          <Link href={`/user/${user.username}`}>
            <TwicImg
              src={`/users/${user.profileImageUrl.split("/")[4]}`}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="flex h-8 flex-row items-center rounded-full border border-zinc-200 bg-zinc-600 bg-opacity-10 px-5 text-sm font-medium leading-none text-zinc-200 transition-all md:hover:bg-opacity-30"
        >
          Sign In
        </Link>
      )}
      <nav
        className={`absolute left-0 top-header z-50 flex h-[calc(100dvh-4rem)] w-[100vw] origin-top-left flex-col gap-8 bg-bg-500 px-4 py-8 transition-all duration-75 md:hidden ${
          showNav ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <Link
          href="/"
          onClick={() => setShowNav(false)}
          className={`flex flex-row items-center gap-4 ${
            path === "/" ? "opacity-100" : "opacity-50"
          }`}
        >
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <Link
          onClick={() => setShowNav(false)}
          href="/canvas"
          className="flex flex-row items-center gap-2"
        >
          <div className="relative mx-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="absolute left-0 top-0 h-2 w-2 animate-ping rounded-full bg-red-500"></div>
          </div>
          <span
            className={`${path === "/canvas" ? "opacity-100" : "opacity-50"}`}
          >
            Canvas
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
