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
        "p-2 w-full whitespace-nowrap flex-1 xs:text-[12px] sm:text-md lg:text-lg border border-primary rounded-lg bg-primary text-white font-semibold hover:opacity-85 transition-all flex gap-1 items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:opacity-100",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
