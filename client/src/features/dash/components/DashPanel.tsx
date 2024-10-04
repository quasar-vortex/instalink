import { ReactNode } from "react";

const DashPanel = ({
  middle,
  title,
  headerActions,
  children,
}: {
  title: string;
  headerActions?: ReactNode;
  middle?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <section className="flex-1 w-full  flex flex-col overflow-y-hidden">
      <div className="p-4 flex items-center justify-between w-full border-b-2 border-gray-400">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-4">{headerActions}</div>
      </div>
      {middle && (
        <div className="py-4 border-b-2 border-gray-400"> {middle}</div>
      )}
      <div className="overflow-y-auto p-4">{children}</div>
    </section>
  );
};
export default DashPanel;
