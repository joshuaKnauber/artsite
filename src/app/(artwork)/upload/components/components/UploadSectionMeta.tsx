"use client";

import TagInput from "@/app/components/Inputs/TagInput";
import TextInput from "@/app/components/Inputs/TextInput";

type UploadSectionMetaProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
};

const UploadSectionMeta = ({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
}: UploadSectionMetaProps) => {
  return (
    <div className="flex flex-col">
      <TextInput
        label="Title"
        placeholder="Artwork Title"
        value={title}
        onChange={setTitle}
      />
      <TextInput
        label="Description"
        placeholder="Artwork Description"
        value={description}
        onChange={setDescription}
        area
      />
      <TagInput
        label="Tags"
        value={tags}
        setValue={setTags}
        placeholder="Tags"
      />
    </div>
  );
};

export default UploadSectionMeta;
