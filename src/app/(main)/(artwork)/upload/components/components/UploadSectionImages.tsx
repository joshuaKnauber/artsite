"use client";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import { ArtworkFileRouter } from "@/app/api/uploadthing/core";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import UploadListItem from "./UploadListItem";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<ArtworkFileRouter>();

type UploadSectionImagesProps = {
  files: File[];
  setFiles: (files: File[]) => void;
  thumbnailId: string | null;
  setThumbnailId: (index: string | null) => void;
};

const UploadSectionImages = ({
  files,
  setFiles,
  thumbnailId,
  setThumbnailId,
}: UploadSectionImagesProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      acceptedFiles = acceptedFiles.filter(
        (file) => !files.find((f) => f.name === file.name)
      );
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

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const activeDragFile = files.find((f) => f.name === activeDragId) as
    | undefined
    | File;

  const onDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((file) => file.name === active.id);
      const newIndex = files.findIndex((file) => file.name === over?.id);
      setFiles(arrayMove([...files], oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {files.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveDragId(e.active.id as string)}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={files.map((file) => file.name)}
            strategy={verticalListSortingStrategy}
          >
            {files.map((file, i) => (
              <UploadListItem
                file={file}
                itemIndex={i}
                removeItem={() => onRemove(i)}
                setThumbnailId={setThumbnailId}
                thumbnailId={thumbnailId}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeDragId && activeDragFile ? (
              <UploadListItem
                file={activeDragFile}
                itemIndex={files.indexOf(activeDragFile)}
                removeItem={() => onRemove(files.indexOf(activeDragFile))}
                setThumbnailId={setThumbnailId}
                thumbnailId={thumbnailId}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
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
