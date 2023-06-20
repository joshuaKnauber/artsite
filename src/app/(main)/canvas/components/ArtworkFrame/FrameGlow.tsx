"use client";

import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";

const FrameGlow = ({ imageKey }: { imageKey: string }) => {
  const [color, setColor] = useState<string>("transparent");

  const getAvgColor = async () => {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(
      `https://uploadthing.com/f/${imageKey}`
    );
    setColor(color.hex);
  };

  useEffect(() => {
    getAvgColor();
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 rounded-3xl opacity-20"
      style={{
        boxShadow: `0px 0px 500px 40px ${color}`,
      }}
    ></div>
  );
};

export default FrameGlow;
