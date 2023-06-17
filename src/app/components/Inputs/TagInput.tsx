"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type TagInputProps = {
  label: string;
  placeholder?: string;
  value: string[];
  setValue: (value: string[]) => void;
};

const TagInput = ({ label, setValue, value, placeholder }: TagInputProps) => {
  const [input, setInput] = useState<string>("");

  const onRemove = (i: number) => {
    const newTags = [...value];
    newTags.splice(i, 1);
    setValue(newTags);
  };

  const onAdd = () => {
    if (input) {
      setValue([...value, input]);
      setInput("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd();
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      e.preventDefault();
      setInput(value[value.length - 1]);
      onRemove(value.length - 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={label} className="flex-shrink-0 text-sm font-light">
        {label}
      </label>
      <div className="flex w-full flex-grow flex-row flex-wrap gap-2 rounded-md border border-white border-opacity-20 bg-bg-600 p-4">
        {value.map((tag, i) => (
          <div
            key={i}
            className="flex h-8 w-fit flex-row items-center gap-3 rounded-lg border border-white border-opacity-20 bg-bg-600 px-3 pr-2"
          >
            <span className="text-sm font-light leading-none">{tag}</span>
            <button onClick={() => onRemove(i)} type="button">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        <input
          className="flex-grow bg-transparent pl-1 focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInput;
