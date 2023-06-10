"use client";

import { useState } from "react";

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
  const [inviteCode, setInviteCode] = useState<string>("");
  const { formHandler, error } = useInviteForm(inviteCode);

  return (
    <form onSubmit={formHandler}>
      <input
        placeholder="Invite Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
      <button disabled={!inviteCode}>Unlock</button>
      <span>{error}</span>
    </form>
  );
};

export default InviteForm;
