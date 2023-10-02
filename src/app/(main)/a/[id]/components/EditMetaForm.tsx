"use client";

import TextInput from "@/app/components/Inputs/TextInput";
import Toggle from "@/app/components/Inputs/Toggle";
import { Artwork } from "@/db/schema";
import { useState } from "react";
import Link from "next/link";
import Spinner from "@/app/components/Spinner/Spinner";
import { UpdateArtworkData } from "@/app/api/artworks/[artwork]/route";
import TagInput from "@/app/components/Inputs/TagInput";

type EditMetaFormProps = {
  artwork: Artwork;
  tags: string[]
};

const EditMetaForm = ({ artwork, tags: initialTags }: EditMetaFormProps) => {
  const [title, setTitle] = useState<string>(artwork.title);
  const [description, setDescription] = useState<string>(artwork.description);
  const [feedback, setFeedback] = useState<boolean>(artwork.feedback);
  const [wip, setWip] = useState<boolean>(artwork.wip);
  const [tags, setTags] = useState<string[]>(initialTags);

  const [updating, setUpdating] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const data: UpdateArtworkData = {
        title,
        description,
        wantsFeedback: feedback,
        wip,
        tags,
      };
      const res = await fetch(`/api/artworks/${artwork.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update artwork");
    } catch (e) {
      console.error(e);
    }
    setUpdating(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <TextInput
        label="Title"
        placeholder="Title"
        value={title}
        onChange={setTitle}
      />
      <TextInput
        label="Description"
        placeholder="Description"
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
      <Toggle label="Feedback" value={feedback} onChange={setFeedback} />
      <Toggle label="WIP" value={wip} onChange={setWip} />
      <div className="flex flex-row items-center gap-4">
        <button
          type="submit"
          disabled={!title || updating}
          className="flex h-8 flex-1 items-center justify-center rounded-md bg-white text-black disabled:opacity-20 md:enabled:hover:opacity-90"
        >
          {updating ? <Spinner className="" /> : "Save"}
        </button>
        <Link
          replace
          className="flex h-full flex-1 items-center justify-center rounded-md border border-white border-opacity-30 opacity-75 md:hover:opacity-100"
          href={`/a/${artwork.id}`}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EditMetaForm;
