import { Outlet } from "react-router-dom";
import { FiUser, FiPenTool, FiHome } from "react-icons/fi";

import NavBar from "@/components/ui/NavBar";
const links = [
  {
    icon: FiHome,
    label: "Home",
    to: "/",
  },
  {
    icon: FiUser,
    label: "Login",
    to: "/login",
  },
  {
    icon: FiPenTool,
    label: "Register",
    to: "/register",
  },
];
const MainLayout = () => {
  return (
    <>
      <NavBar links={links} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
