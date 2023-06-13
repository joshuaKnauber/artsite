"use client";

import TagInput from "@/app/components/Inputs/TagInput";
import TextInput from "@/app/components/Inputs/TextInput";
import Toggle from "@/app/components/Inputs/Toggle";

type UploadSectionMetaProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  feedback: boolean;
  setFeedback: (feedback: boolean) => void;
};

const UploadSectionMeta = ({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
  feedback,
  setFeedback,
}: UploadSectionMetaProps) => {
  return (
    <div className="flex flex-col gap-8">
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
      {/* <TagInput
        label="Tags"
        value={tags}
        setValue={setTags}
        placeholder="Tags"
      /> */}
      <Toggle label="Allow Feedback" value={feedback} onChange={setFeedback} />
    </div>
  );
};

export default UploadSectionMeta;
