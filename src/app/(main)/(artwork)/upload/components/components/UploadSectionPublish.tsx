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
};

const UploadSectionPublish = ({
  title,
  description,
  tags,
  files,
  feedback,
  thumbnailIndex,
}: UploadSectionPublishProps) => {
  return (
    <div className="flex flex-col gap-8">
      {title && <span className="text-xl font-medium">{title}</span>}
      {description && (
        <span className="font-light leading-snug opacity-75">
          {description}
        </span>
      )}
      {tags.length > 0 && (
        <div className="flex flex-row flex-wrap items-center gap-2">
          {tags.map((tag, i) => (
            <span className="rounded-sm bg-bg-600 px-4 py-1 text-sm" key={i}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {feedback && (
        <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-orange-900 bg-opacity-10 px-4 py-1">
          <CheckIcon className="h-4 w-4 text-orange-400" />
          <span className="text-sm text-orange-400">Looking for feedback</span>
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
