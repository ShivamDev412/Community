import React from "react";
import { ExtendedButtonProps } from "@/Types";
import { twMerge } from "tailwind-merge";

const Button: React.FC<ExtendedButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "px-3 py-3 flex-1 w-full rounded-lg bg-primary text-white font-semibold hover:opacity-85 transition-all flex gap-1 items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:opacity-100",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
