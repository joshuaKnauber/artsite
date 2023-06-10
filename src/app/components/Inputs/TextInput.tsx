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
    <div className="flex flex-row gap-4">
      <label htmlFor={label}>{label}</label>
      {!area ? (
        <input
          type="text"
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
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
