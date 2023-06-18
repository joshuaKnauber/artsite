"use client";

type UploadStepperProps = {
  current: number;
  setStep: (step: number) => void;
};

const UploadStepper = ({ current, setStep }: UploadStepperProps) => {
  return (
    <div className="flex flex-row items-center rounded-full border border-white border-opacity-40">
      <button
        onClick={() => setStep(0)}
        className={`h-10 w-20 rounded-full text-sm transition-all md:w-24 ${
          current > 0
            ? "font-medium text-blue-400"
            : current === 0
            ? "bg-blue-900 bg-opacity-10 font-medium text-blue-400 outline outline-1 outline-blue-400"
            : "opacity-50"
        }`}
      >
        Info
      </button>
      <button
        onClick={() => setStep(1)}
        className={`h-10 w-20 rounded-full text-sm transition-all md:w-24 ${
          current > 1
            ? "font-medium text-blue-400"
            : current === 1
            ? "bg-blue-900 bg-opacity-10 font-medium text-blue-400 outline outline-1 outline-blue-400"
            : "opacity-50"
        }`}
      >
        Images
      </button>
      <button
        onClick={() => setStep(2)}
        className={`h-10 w-20 rounded-full text-sm transition-all md:w-24 ${
          current > 2
            ? "font-medium text-blue-400"
            : current === 2
            ? "bg-blue-900 bg-opacity-10 font-medium text-blue-400 outline outline-1 outline-blue-400"
            : "opacity-50"
        }`}
      >
        Publish
      </button>
    </div>
  );
};

export default UploadStepper;
