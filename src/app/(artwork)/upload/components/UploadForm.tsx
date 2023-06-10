"use client";

import { useState } from "react";
import UploadStepper from "./UploadStepper";
import TextInput from "@/app/components/Inputs/TextInput";
import TagInput from "@/app/components/Inputs/TagInput";
import { PostArtworkData } from "@/app/api/artworks/route";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onUpload = async () => {
    try {
      setUploading(true);
      setError("");
      const data: PostArtworkData = {
        title,
        description,
        tags,
      };
      const response = await fetch("/api/artworks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const newArtwork = await response.json();
      router.push(`/a/${newArtwork.id}`);
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
    setUploading(false);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 2) {
      onUpload();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <UploadStepper current={step} setStep={setStep} />
      {step === 0 ? (
        <form onSubmit={onFormSubmit}>
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
          <button type="submit" disabled={!title}>
            next
          </button>
        </form>
      ) : step === 1 ? (
        <form onSubmit={onFormSubmit}>
          <button type="submit">next</button>
        </form>
      ) : step === 2 ? (
        <form onSubmit={onFormSubmit}>
          <span>{title}</span>
          <span>{description}</span>
          <button type="submit" disabled={!title || uploading}>
            {uploading ? "uploading" : "publish"}
          </button>
          <span>{error}</span>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UploadForm;
