"use client";

import { siInstagram, siTwitter } from "simple-icons";

type IconProps = {
  className?: string;
};

export const TwitterIcon = ({ className = "" }: IconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 fill-white ${className}`}
    >
      <path d={siTwitter.path}></path>
    </svg>
  );
};

export const InstagramIcon = ({ className = "" }: IconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 fill-white ${className}`}
    >
      <path d={siInstagram.path}></path>
    </svg>
  );
};
