import React from "react";
import { ExtendedButtonProps } from "@/Types";

const Button: React.FC<ExtendedButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="px-3 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-85 transition-all flex gap-1 items-center justify-center"
    >
      {props.children}
    </button>
  );
};

export default Button;
