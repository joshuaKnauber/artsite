"use client";

import { useParams } from "next/navigation";

export default function UserErrorPage() {
  const { name } = useParams();

  return (
    <main className="flex min-h-screen">
      <span>couldn't find user {name}</span>
    </main>
  );
}
