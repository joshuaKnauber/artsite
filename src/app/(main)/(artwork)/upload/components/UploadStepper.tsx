"use client";

type UploadStepperProps = {
  current: number;
  setStep: (step: number) => void;
};

const UploadStepper = ({ current, setStep }: UploadStepperProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <button
        onClick={() => setStep(0)}
        className={`h-14 w-20 rounded-full border-2 text-sm transition-all md:w-24 ${
          current > 0
            ? "border-white border-opacity-75 bg-white bg-opacity-10 text-white text-opacity-100"
            : current === 0
            ? "border-amber-400 border-opacity-100 bg-amber-900 bg-opacity-20 text-amber-400 text-opacity-100"
            : "border-white border-opacity-10 bg-white bg-opacity-5 text-white text-opacity-50"
        }`}
      >
        Info
      </button>
      <div
        className={`h-1 w-3 rounded-full bg-white ${
          current > 0 ? "bg-opacity-75" : "bg-opacity-25"
        }`}
      ></div>
      <button
        onClick={() => setStep(1)}
        className={`h-14 w-20 rounded-full border-2 text-sm transition-all md:w-24 ${
          current > 1
            ? "border-white border-opacity-75 bg-white bg-opacity-10 text-white text-opacity-100"
            : current === 1
            ? "border-amber-400 border-opacity-100 bg-amber-900 bg-opacity-20 text-amber-400 text-opacity-100"
            : "border-white border-opacity-10 bg-white bg-opacity-5 text-white text-opacity-50"
        }`}
      >
        Images
      </button>
      <div
        className={`h-1 w-3 rounded-full bg-white ${
          current > 1 ? "bg-opacity-75" : "bg-opacity-25"
        }`}
      ></div>
      <button
        onClick={() => setStep(2)}
        className={`h-14 w-20 rounded-full border-2 text-sm transition-all md:w-24 ${
          current > 2
            ? "border-white border-opacity-75 bg-white bg-opacity-10 text-white text-opacity-100"
            : current === 2
            ? "border-amber-400 border-opacity-100 bg-amber-900 bg-opacity-20 text-amber-400 text-opacity-100"
            : "border-white border-opacity-10 bg-white bg-opacity-5 text-white text-opacity-50"
        }`}
      >
        Publish
      </button>
    </div>
  );
};

export default UploadStepper;
