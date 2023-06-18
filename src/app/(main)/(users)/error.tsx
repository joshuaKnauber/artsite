"use client";

import { useParams } from "next/navigation";

export default function ArtworkErrorPage() {
  const { name } = useParams();

  return (
    <main className="flex min-h-screen">
      <span>couldnt find user {name}</span>
    </main>
  );
}
