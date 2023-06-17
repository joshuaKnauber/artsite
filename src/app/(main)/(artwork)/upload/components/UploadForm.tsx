"use client";

import { useState } from "react";
import UploadStepper from "./UploadStepper";
import UploadSectionImages from "./components/UploadSectionImages";
import UploadSectionMeta from "./components/UploadSectionMeta";
import UploadSectionPublish from "./components/UploadSectionPublish";
import useOnUpload from "./hooks/useOnUpload";
import Spinner from "@/app/components/Spinner/Spinner";

const UploadForm = () => {
  const [step, setStep] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<boolean>(true);
  const [wip, setWip] = useState<boolean>(false);

  const { onUpload, error, uploading } = useOnUpload();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 2) {
      onUpload({
        title,
        description,
        tags,
        files,
        feedback,
        thumbnailIndex,
        wip,
      });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-8 md:gap-16">
      <div className="mx-auto flex flex-col">
        <UploadStepper current={step} setStep={setStep} />
      </div>
      <div className="mx-auto w-full max-w-xl px-4 pb-8">
        {step === 0 ? (
          <form onSubmit={onFormSubmit} className="flex flex-col gap-8">
            <UploadSectionMeta
              {...{
                title,
                setTitle,
                description,
                setDescription,
                tags,
                setTags,
                feedback,
                setFeedback,
                wip,
                setWip,
              }}
            />
            <button
              type="submit"
              disabled={!title}
              className="ml-auto h-10 w-[200px] flex-row items-center justify-center rounded-md border border-white border-opacity-50 bg-white bg-opacity-10 transition-all disabled:opacity-20 md:enabled:hover:bg-opacity-20"
            >
              Next Step
            </button>
          </form>
        ) : step === 1 ? (
          <form onSubmit={onFormSubmit} className="flex flex-col gap-8">
            <UploadSectionImages
              files={files}
              setFiles={setFiles}
              thumbnailIndex={thumbnailIndex}
              setThumbnailIndex={setThumbnailIndex}
            />
            <button
              type="submit"
              disabled={files.length === 0}
              className="ml-auto h-10 w-[200px] flex-row items-center justify-center rounded-md border border-white border-opacity-50 bg-white bg-opacity-10 transition-all disabled:opacity-20 md:enabled:hover:bg-opacity-20"
            >
              Next Step
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={onFormSubmit} className="flex flex-col gap-8">
            <UploadSectionPublish
              {...{
                title,
                description,
                tags,
                files,
                feedback,
                thumbnailIndex,
                wip,
              }}
            />
            <button
              type="submit"
              disabled={!title || files.length === 0 || uploading}
              className="ml-auto h-10 w-[200px] flex-row items-center justify-center rounded-md border border-white border-opacity-50 bg-white bg-opacity-10 transition-all disabled:opacity-20 md:enabled:hover:bg-opacity-20"
            >
              {uploading ? (
                <Spinner className="m-auto fill-white" />
              ) : (
                "Publish"
              )}
            </button>
            <span className="text-sm text-red-700">{error}</span>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
