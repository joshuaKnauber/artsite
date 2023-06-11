"use client";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import { ArtworkFileRouter } from "@/app/api/uploadthing/core";
import { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import PreviewImage from "./PreviewImage";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<ArtworkFileRouter>();

type UploadSectionImagesProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

const UploadSectionImages = ({ files, setFiles }: UploadSectionImagesProps) => {
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
    <div className="flex flex-col">
      {files.map((file, i) => (
        <div key={i}>
          <PreviewImage file={file} onRemove={() => onRemove(i)} />
          <button onClick={() => onRemove(files.indexOf(file))}>X</button>
        </div>
      ))}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        Drop files here!
      </div>
    </div>
  );
};

export default UploadSectionImages;
