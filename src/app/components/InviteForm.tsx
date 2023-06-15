"use client";

import { useEffect, useRef, useState } from "react";

const useInviteForm = (code: string) => {
  const [error, setError] = useState<string>("");

  const attemptUnlock = async () => {
    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        body: JSON.stringify({ invite: code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        setError("Invalid invite code");
        return;
      }
      if (response.status === 200) {
        window.location.reload();
        return;
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    attemptUnlock();
  };

  return {
    formHandler,
    error,
  };
};

const InviteForm = () => {
  const [inviteCode, setInviteCode] = useState<string>("     ");
  const { formHandler, error } = useInviteForm(inviteCode);

  const refInput1 = useRef<HTMLInputElement>(null);
  const refInput2 = useRef<HTMLInputElement>(null);
  const refInput3 = useRef<HTMLInputElement>(null);
  const refInput4 = useRef<HTMLInputElement>(null);
  const refInput5 = useRef<HTMLInputElement>(null);

  const updateInviteCode = (index: number, value: string) => {
    value = (value.toString().trim() || " ")[
      Math.max(0, value.trim().toString().length - 1)
    ].toUpperCase();
    const newCode = inviteCode.split("");
    newCode[index] = value;
    setInviteCode(newCode.join(""));

    [refInput1, refInput2, refInput3, refInput4, refInput5][
      index + 1
    ]?.current?.focus();
  };

  const onKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (inviteCode[index] === " ") {
        [refInput1, refInput2, refInput3, refInput4, refInput5][
          index - 1
        ]?.current?.focus();
        [refInput1, refInput2, refInput3, refInput4, refInput5][
          index - 1
        ]?.current?.select();
      } else {
        updateInviteCode(index, " ");
        [refInput1, refInput2, refInput3, refInput4, refInput5][
          index
        ]?.current?.select();
      }
    }
  };

  return (
    <form onSubmit={formHandler} className="flex flex-col items-center gap-8">
      <div className="flex flex-row gap-4">
        <input
          ref={refInput1}
          className="h-16 w-14 rounded-md bg-bg-600 text-center text-lg font-medium focus:outline-none"
          value={inviteCode.length > 0 ? inviteCode[0] : ""}
          autoFocus
          onChange={(e) => updateInviteCode(0, e.target.value)}
          onKeyDown={(e) => onKeyDown(0, e)}
        />
        <input
          ref={refInput2}
          className="h-16 w-14 rounded-md bg-bg-600 text-center text-lg font-medium focus:outline-none"
          value={inviteCode.length > 1 ? inviteCode[1] : ""}
          onChange={(e) => updateInviteCode(1, e.target.value)}
          onKeyDown={(e) => onKeyDown(1, e)}
        />
        <input
          ref={refInput3}
          className="h-16 w-14 rounded-md bg-bg-600 text-center text-lg font-medium focus:outline-none"
          value={inviteCode.length > 2 ? inviteCode[2] : ""}
          onChange={(e) => updateInviteCode(2, e.target.value)}
          onKeyDown={(e) => onKeyDown(2, e)}
        />
        <input
          ref={refInput4}
          className="h-16 w-14 rounded-md bg-bg-600 text-center text-lg font-medium focus:outline-none"
          value={inviteCode.length > 3 ? inviteCode[3] : ""}
          onChange={(e) => updateInviteCode(3, e.target.value)}
          onKeyDown={(e) => onKeyDown(3, e)}
        />
        <input
          ref={refInput5}
          className="h-16 w-14 rounded-md bg-bg-600 text-center text-lg font-medium focus:outline-none"
          value={inviteCode.length > 4 ? inviteCode[4] : ""}
          onChange={(e) => updateInviteCode(4, e.target.value)}
          onKeyDown={(e) => onKeyDown(4, e)}
        />
      </div>
      <button
        disabled={inviteCode.includes(" ")}
        className="flex h-8 w-fit flex-row items-center justify-center rounded-full border border-blue-400 bg-blue-900 bg-opacity-10 px-10 text-sm font-medium leading-none text-blue-400 transition-all disabled:opacity-50 md:enabled:hover:bg-opacity-30"
      >
        Unlock
      </button>
      <span>{error}</span>
    </form>
  );
};

export default InviteForm;
