"use client";

import Spinner from "@/app/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteBtnProps = {
  id: string;
};

const DeleteBtn = ({ id }: DeleteBtnProps) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteArtwork = async () => {
    if (confirm("Are you sure you want to delete this piece?")) {
      setDeleting(true);
      try {
        const response = await fetch(`/api/artworks/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          console.error(response);
          return;
        }
        router.replace("/");
      } catch (error) {
        console.error(error);
      }
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={deleteArtwork}
      className="flex h-8 w-[200px] items-center justify-center rounded-md border border-red-500 bg-red-900 bg-opacity-20 text-sm text-red-500 transition-all md:hover:bg-opacity-30"
    >
      {deleting ? (
        <Spinner className="h-5 w-5 fill-red-500" />
      ) : (
        "Delete Artwork"
      )}
    </button>
  );
};

export default DeleteBtn;
