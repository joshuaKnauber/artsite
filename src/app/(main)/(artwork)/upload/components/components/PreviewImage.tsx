import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type PreviewImageProps = {
  file: File;
  onRemove?: () => void;
  showLabel?: boolean;
};

const PreviewImage = ({ file, onRemove, showLabel }: PreviewImageProps) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    setPreview(URL.createObjectURL(file));
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [file]);

  return (
    <div className="flex w-full flex-col gap-1">
      {showLabel && (
        <div className="flex flex-row items-center gap-4">
          <span className="flex-grow whitespace-nowrap text-sm leading-none opacity-50">
            {file.name}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white bg-opacity-0 transition-all md:hover:bg-opacity-5"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      <img src={preview} className="w-full" />
    </div>
  );
};

export default PreviewImage;
