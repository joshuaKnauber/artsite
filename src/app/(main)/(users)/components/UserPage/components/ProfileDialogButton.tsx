"use client";

import { useSetAtom } from "jotai";
import { profileDialogAtom } from "./profileDialogAtoms";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useClerk } from "@clerk/nextjs";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const ProfileDialogButton = () => {
  const setShow = useSetAtom(profileDialogAtom);
  const { signOut } = useClerk();

  const onClick = () => {
    setShow(true);
  };

  return (
    <div className="flex h-8 w-full flex-row items-center gap-2">
      <Link
        href="/profile"
        className="flex aspect-square h-full items-center justify-center rounded-md bg-white bg-opacity-5 text-sm transition-all md:hover:bg-opacity-10"
      >
        <PencilIcon className="h-4 w-4" />
      </Link>
      <button
        onClick={onClick}
        className="h-full flex-grow rounded-md bg-white bg-opacity-5 px-6 text-sm transition-all md:hover:bg-opacity-10"
      >
        Manage Account
      </button>
      <button
        onClick={() => signOut()}
        className="flex aspect-square h-full items-center justify-center rounded-md bg-white bg-opacity-5 text-sm transition-all md:hover:bg-opacity-10"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProfileDialogButton;
