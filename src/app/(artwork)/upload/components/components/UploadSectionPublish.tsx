"use client";

import PreviewImage from "./PreviewImage";

type UploadSectionPublishProps = {
  title: string;
  description: string;
  tags: string[];
  files: File[];
};

const UploadSectionPublish = ({
  title,
  description,
  tags,
  files,
}: UploadSectionPublishProps) => {
  return (
    <div className="flex flex-col">
      <span>{title}</span>
      <span>{description}</span>
      <div>
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
      <div>
        {files.map((file, i) => (
          <PreviewImage key={i} file={file} />
        ))}
      </div>
    </div>
  );
};

export default UploadSectionPublish;
