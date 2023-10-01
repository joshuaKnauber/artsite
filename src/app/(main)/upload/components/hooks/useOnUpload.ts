import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadFiles } from "../components/UploadSectionImages";
import { PostArtworkData } from "@/app/api/artworks/route";
import { Artwork } from "@/db/schema";

const useOnUpload = () => {
  const router = useRouter();

  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getImageSizes = async (files: File[]) => {
    const sizes = await Promise.all(
      files.map((file) => {
        return new Promise<{ width: number; height: number }>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({ width: img.width, height: img.height });
            URL.revokeObjectURL(img.src);
          };
          img.src = URL.createObjectURL(file);
        });
      })
    );
    return sizes;
  };

  const onUpload = async ({
    title,
    description,
    tags,
    files,
    feedback,
    thumbnailIndex,
    wip,
  }: {
    title: string;
    description: string;
    tags: string[];
    files: File[];
    feedback: boolean;
    thumbnailIndex: number;
    wip: boolean;
  }) => {
    try {
      setUploading(true);
      setError("");
      const imageSizes = await getImageSizes(files);
      const imageResponse = await uploadFiles(files, "artworkImages");
      if (imageResponse.length !== files.length) {
        throw new Error("Not all files were uploaded");
      }
      const data: PostArtworkData = {
        title,
        description,
        tags,
        imageIds: imageResponse.map((image) => image.fileKey),
        imageSizes: imageResponse.map((_, i) => imageSizes[i]),
        thumbnailIndex,
        wantsFeedback: feedback,
        wip,
      };
      const metaResponse = await fetch("/api/artworks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!metaResponse.ok) {
        throw new Error(metaResponse.statusText);
      }
      const newArtwork = await metaResponse.json() as Artwork
      router.replace(`/a/${newArtwork.id}?new=1`);
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
    setUploading(false);
  };

  return {
    onUpload,
    uploading,
    error,
  };
};

export default useOnUpload;
