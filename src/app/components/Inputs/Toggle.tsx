"use client";

type ToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Toggle = ({ label, onChange, value }: ToggleProps) => {
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <label
        className="text-sm font-light md:w-[100px] md:text-right"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type="checkbox"
        className="hidden"
        name={label}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`h-7 w-12 cursor-pointer rounded-full p-1 transition-all ${
          value ? "bg-bg-700" : "bg-bg-600"
        }`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`h-5 w-5 rounded-full transition-all ${
            value ? "ml-5 bg-white" : "ml-0 bg-bg-700"
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
