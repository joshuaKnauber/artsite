"use client";

type TextInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
};

const TextInput = ({
  label,
  onChange,
  value,
  placeholder,
  area,
}: TextInputProps) => {
  return (
    <div
      className={`flex w-full flex-row gap-4 ${
        area ? "items-start" : "items-center"
      }`}
    >
      <label
        className="w-[100px] text-right text-sm font-light"
        htmlFor={label}
      >
        {label}
      </label>
      {!area ? (
        <input
          type="text"
          className="h-10 flex-grow rounded-sm bg-bg-600 px-4"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          className="min-h-16 h-24 flex-grow rounded-sm bg-bg-600 p-4"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default TextInput;
