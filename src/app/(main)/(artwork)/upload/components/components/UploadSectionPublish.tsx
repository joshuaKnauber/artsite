"use client";

import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";
import PreviewImage from "./PreviewImage";

type UploadSectionPublishProps = {
  title: string;
  description: string;
  tags: string[];
  files: File[];
  feedback: boolean;
  thumbnailIndex: number;
  wip: boolean;
};

const UploadSectionPublish = ({
  title,
  description,
  tags,
  files,
  feedback,
  thumbnailIndex,
  wip,
}: UploadSectionPublishProps) => {
  return (
    <div className="flex flex-col gap-8">
      <span
        className={`text-xl font-medium ${
          title ? "opacity-100" : "opacity-50"
        }`}
      >
        {title || "Untitled"}
      </span>
      {description && (
        <span className="font-light leading-snug opacity-75">
          {description}
        </span>
      )}
      {tags.length > 0 && (
        <div className="flex flex-row flex-wrap items-center gap-2">
          {tags.map((tag, i) => (
            <span
              className="rounded-md border border-white border-opacity-20 bg-white bg-opacity-5 px-4 py-1 text-sm font-light"
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {(feedback || wip) && (
        <div className="flex flex-row flex-wrap gap-2">
          {feedback && (
            <div className="flex w-fit flex-row items-center gap-2 rounded-full border border-orange-400 bg-orange-900 bg-opacity-10 px-4 py-1">
              <span className="text-sm text-orange-400">
                Looking for feedback
              </span>
            </div>
          )}
          {wip && (
            <div className="flex w-fit flex-row items-center gap-2 rounded-full border border-purple-400 bg-purple-900 bg-opacity-10 px-4 py-1">
              <span className="text-sm text-purple-400">Work In Progress</span>
            </div>
          )}
        </div>
      )}
      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          {files.map((file, i) => (
            <div key={i} className="relative">
              {thumbnailIndex === i && (
                <div className="absolute bottom-4 right-4 flex h-8 flex-row items-center gap-2 rounded-md border border-white border-opacity-50 bg-black bg-opacity-50 px-3 text-sm font-light">
                  <PhotoIcon className="h-4 w-4" />
                  Thumbnail
                </div>
              )}
              <PreviewImage key={i} file={file} showLabel={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadSectionPublish;
