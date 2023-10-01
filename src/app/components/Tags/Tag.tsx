"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default async function Tag({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onToggleTag = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const tags = searchParams.get("tags")?.split(",") ?? [];

    const index = tags.indexOf(name);
    if (index === -1) {
      tags.push(name);
    } else {
      tags.splice(index, 1);
    }

    if (tags.length > 0) {
      current.set("tags", tags.join(","));
    } else {
      current.delete("tags");
    }

    const search = current.toString();
    const query = search ? "?" + current.toString() : "";

    router.push(pathname + query);
  };

  const isActive = searchParams.get("tags")?.split(",").includes(name);

  return (
    <button
      onClick={onToggleTag}
      className={`rounded-md px-3 py-2 text-sm leading-none text-opacity-50 transition-all ${
        isActive ? "bg-bg-700" : "bg-bg-600"
      }`}
    >
      {name}
    </button>
  );
}
