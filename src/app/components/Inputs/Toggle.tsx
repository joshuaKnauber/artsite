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
        className="w-[100px] text-right text-sm font-light"
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
        className={`h-7 w-12 cursor-pointer rounded-full p-0.5 transition-all ${
          value ? "bg-white" : "bg-bg-600"
        }`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`h-6 w-6 rounded-full transition-all ${
            value ? "ml-5 bg-black" : "ml-0 bg-bg-700"
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
