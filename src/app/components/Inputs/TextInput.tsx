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
    <div className="flex w-full flex-col items-start gap-2">
      {label && (
        <label className="text-sm font-light" htmlFor={label}>
          {label}
        </label>
      )}
      {!area ? (
        <input
          type="text"
          className="h-9 w-full flex-grow rounded-md border border-white border-opacity-20 bg-white bg-opacity-5 px-4 font-light placeholder-white placeholder-opacity-50"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          className="min-h-16 h-24 w-full flex-grow rounded-md border border-white border-opacity-20 bg-white bg-opacity-5 p-4 font-light placeholder-white placeholder-opacity-50"
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
