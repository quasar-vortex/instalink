import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
const DashLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-grow flex flex-col ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashLayout;
