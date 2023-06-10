"use client";

type UploadStepperProps = {
  current: number;
  setStep: (step: number) => void;
};

const UploadStepper = ({ current, setStep }: UploadStepperProps) => {
  return (
    <div className="flex flex-row items-center">
      <button onClick={() => setStep(0)}>1</button>
      <button onClick={() => setStep(1)}>2</button>
      <button onClick={() => setStep(2)}>3</button>
    </div>
  );
};

export default UploadStepper;
