import { useSortable } from "@dnd-kit/sortable";
import { PhotoIcon } from "@heroicons/react/24/outline";
import PreviewImage from "./PreviewImage";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

type UploadListItemProps = {
  file: File;
  thumbnailId: string | null;
  setThumbnailId: (index: string | null) => void;
  itemIndex: number;
  removeItem: () => void;
};

const UploadListItem = ({
  file,
  itemIndex,
  setThumbnailId,
  thumbnailId,
  removeItem,
}: UploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.name });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`relative transition-all ${
        isDragging ? "opacity-10" : "opacity-100"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-2 hidden h-8 w-5 items-center justify-center rounded-md opacity-50 transition-all hover:bg-bg-600 hover:opacity-100 md:flex"
      >
        <ChevronUpDownIcon className="h-5 w-5" />
      </div>
      <button
        onClick={() => setThumbnailId(file.name)}
        type="button"
        className={`absolute bottom-4 right-4 flex h-8 flex-row items-center gap-2 rounded-md border border-white border-opacity-50 bg-black bg-opacity-50 px-3 text-sm font-light ${
          thumbnailId === file.name ? "opacity-100" : "opacity-50"
        }`}
      >
        <PhotoIcon className="h-4 w-4" />
        {thumbnailId === file.name ? "Thumbnail" : ""}
      </button>
      <PreviewImage
        dragHandle={
          <div {...attributes} {...listeners} className="md:hidden">
            <ChevronUpDownIcon className="h-5 w-5" />
          </div>
        }
        showLabel
        file={file}
        onRemove={removeItem}
      />
    </div>
  );
};

export default UploadListItem;
