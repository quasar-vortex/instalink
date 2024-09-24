import React from "react";

type DashPanelProps = {
  headerTitle: string;
  headerActions: React.ReactNode[];
  children: React.ReactNode;
};
const DashPanel = ({
  headerActions,
  headerTitle,
  children,
}: DashPanelProps) => {
  return (
    <section className="flex flex-col flex-1 h-full">
      <header className="flex justify-between p-4 w-full  border-b-2 border-slate-400">
        <h2 className="font-bold text-lg">{headerTitle}</h2>
        <div className="flex gap-4">{headerActions}</div>
      </header>

      <article className="bg-gray-100 p-4 flex flex-col gap-4 w-full flex-grow overflow-y-auto mx-auto">
        {children}
      </article>
    </section>
  );
};

export default DashPanel;
