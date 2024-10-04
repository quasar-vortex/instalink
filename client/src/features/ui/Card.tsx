import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
};
const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-white p-6 rounded-md shadow-md shadow-slate-400/50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
