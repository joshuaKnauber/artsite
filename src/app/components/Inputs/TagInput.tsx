"use client";

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
    <div className="flex flex-row gap-4">
      <label htmlFor={label}>{label}</label>
      <div>
        {value.map((tag, i) => (
          <div key={i}>
            <span>{tag}</span>
            <button onClick={() => onRemove(i)} type="button">
              x
            </button>
          </div>
        ))}
        <input
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
