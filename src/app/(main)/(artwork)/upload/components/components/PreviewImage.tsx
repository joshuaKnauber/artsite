import { useEffect, useState } from "react";

type PreviewImageProps = {
  file: File;
  onRemove?: () => void;
};

const PreviewImage = ({ file, onRemove }: PreviewImageProps) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    setPreview(URL.createObjectURL(file));
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [file]);

  return (
    <div>
      <img src={preview} className="w-48" />
      <span>{file.name}</span>
      {onRemove && <button onClick={onRemove}>X</button>}
    </div>
  );
};

export default PreviewImage;
