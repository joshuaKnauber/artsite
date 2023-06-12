"use client";

import { UserProfile } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { profileDialogAtom } from "./profileDialogAtoms";
import { useEffect, useRef } from "react";
import { dark } from "@clerk/themes";

const ProfileDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [show, setShow] = useAtom(profileDialogAtom);

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return (
    <dialog
      onClick={onDialogClick}
      ref={dialogRef}
      className="z-50 bg-transparent"
    >
      <div className="h-full w-full overflow-y-auto rounded-md bg-bg-400">
        <UserProfile
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </dialog>
  );
};

export default ProfileDialog;
