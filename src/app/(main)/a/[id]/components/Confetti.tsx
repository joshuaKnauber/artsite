"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

type ConfettiProps = {
  show: boolean;
};

const Confetti = ({ show }: ConfettiProps) => {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  if (!show) return null;

  return <ReactConfetti width={size[0]} height={size[1]} recycle={false} />;
};

export default Confetti;
