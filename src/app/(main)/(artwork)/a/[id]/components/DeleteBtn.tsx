"use client";

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
        router.push("/");
      } catch (error) {
        console.error(error);
      }
      setDeleting(false);
    }
  };

  return (
    <button onClick={deleteArtwork}>{deleting ? "loading" : "delete"}</button>
  );
};

export default DeleteBtn;
