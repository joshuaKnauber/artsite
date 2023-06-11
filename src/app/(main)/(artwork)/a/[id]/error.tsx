"use client";

import { useParams } from "next/navigation";

export default function ArtworkErrorPage() {
  const { id } = useParams();

  return (
    <main className="flex min-h-screen">
      <span>couldnt find artwork {id}</span>
    </main>
  );
}
