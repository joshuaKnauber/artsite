"use client";

import { useState } from "react";
import UploadStepper from "./UploadStepper";
import UploadSectionImages from "./components/UploadSectionImages";
import UploadSectionMeta from "./components/UploadSectionMeta";
import UploadSectionPublish from "./components/UploadSectionPublish";
import useOnUpload from "./hooks/useOnUpload";

const UploadForm = () => {
  const [step, setStep] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { onUpload, error, uploading } = useOnUpload();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 2) {
      onUpload({ title, description, tags, files });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <UploadStepper current={step} setStep={setStep} />
      {step === 0 ? (
        <form onSubmit={onFormSubmit}>
          <UploadSectionMeta
            {...{ title, setTitle, description, setDescription, tags, setTags }}
          />
          <button type="submit" disabled={!title}>
            next
          </button>
        </form>
      ) : step === 1 ? (
        <form onSubmit={onFormSubmit}>
          <UploadSectionImages files={files} setFiles={setFiles} />
          <button type="submit" disabled={files.length === 0}>
            next
          </button>
        </form>
      ) : step === 2 ? (
        <form onSubmit={onFormSubmit}>
          <UploadSectionPublish {...{ title, description, tags, files }} />
          <button
            type="submit"
            disabled={!title || files.length === 0 || uploading}
          >
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
