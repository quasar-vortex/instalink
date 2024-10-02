import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="min-h-[calc(100vh-3.5rem)] flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
