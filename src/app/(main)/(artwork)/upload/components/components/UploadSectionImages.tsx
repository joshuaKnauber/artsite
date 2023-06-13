"use client";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import { ArtworkFileRouter } from "@/app/api/uploadthing/core";
import { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import PreviewImage from "./PreviewImage";
import { PhotoIcon } from "@heroicons/react/24/outline";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<ArtworkFileRouter>();

type UploadSectionImagesProps = {
  files: File[];
  setFiles: (files: File[]) => void;
  thumbnailIndex: number;
  setThumbnailIndex: (index: number) => void;
};

const UploadSectionImages = ({
  files,
  setFiles,
  thumbnailIndex,
  setThumbnailIndex,
}: UploadSectionImagesProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const onRemove = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/gif": [],
    },
    maxSize: 16 * 1024 * 1024,
    maxFiles: 16,
  });

  return (
    <div className="flex flex-col gap-8">
      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          {files.map((file, i) => (
            <div className="relative" key={i}>
              <button
                onClick={() => setThumbnailIndex(i)}
                type="button"
                className={`absolute bottom-4 right-4 flex h-8 flex-row items-center gap-2 rounded-md border border-white border-opacity-50 bg-black bg-opacity-50 px-3 text-sm font-light ${
                  thumbnailIndex === i ? "opacity-100" : "opacity-50"
                }`}
              >
                <PhotoIcon className="h-4 w-4" />
                {thumbnailIndex === i ? "Thumbnail" : ""}
              </button>
              <PreviewImage
                showLabel
                file={file}
                onRemove={() => onRemove(i)}
              />
            </div>
          ))}
        </div>
      )}
      <div
        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-white border-opacity-10 bg-white bg-opacity-5"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="hidden text-lg font-light text-white text-opacity-50 md:block">
          {"Drop files here!"}
        </span>
        <span className="block text-lg font-light text-white text-opacity-50 md:hidden">
          {"Tap to select images!"}
        </span>
        <span className="text-sm font-light text-white text-opacity-50">
          {"(jpg, png, gif, 16MB max)"}
        </span>
      </div>
    </div>
  );
};

export default UploadSectionImages;
