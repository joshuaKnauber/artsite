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
      className={`flex w-full flex-col gap-1 md:flex-row md:gap-4 ${
        area ? "items-start" : "items-start md:items-center"
      }`}
    >
      <label
        className="text-sm font-light md:w-[100px] md:text-right"
        htmlFor={label}
      >
        {label}
      </label>
      {!area ? (
        <input
          type="text"
          className="h-10 w-full flex-grow rounded-sm bg-bg-600 px-4 md:w-auto"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          className="min-h-16 h-24 w-full flex-grow rounded-sm bg-bg-600 p-4 md:w-auto"
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
