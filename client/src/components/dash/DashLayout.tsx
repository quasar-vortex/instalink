import SideBar from "./SideBar";
import Protected from "../ui/Protected";
const DashLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-grow flex flex-col ">
          <Protected />
        </main>
      </div>
    </>
  );
};

export default DashLayout;
