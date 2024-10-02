import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  bgColor?: "red" | "blue" | "indigo";
  children?: ReactNode;
  className?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({
  bgColor = "blue",
  type = "button",
  children,
  disabled = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={clsx({
        "px-4 py-2 text-gray-200 duration-200": true,
        "bg-blue-600 hover:bg-blue-700": bgColor === "blue",
        "bg-red-600 hover:bg-red-700": bgColor === "red",
        "bg-indigo-600 hover:bg-indigo-700": bgColor === "indigo",
        [className || ""]: true,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
