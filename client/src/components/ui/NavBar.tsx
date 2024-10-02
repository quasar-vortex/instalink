import { FiHome, FiPenTool, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useMemo } from "react";
const links = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/login", label: "Login", icon: FiUser },
  { to: "/register", label: "Register", icon: FiPenTool },
];

const NavBar = () => {
  const renderedLinks = useMemo(
    () =>
      links.map(({ icon: Icon, label, to }) => (
        <li key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => {
              return isActive
                ? "flex underline items-center gap-1 hover:text-gray-600 duration-200 font-semibold"
                : "flex items-center gap-1 hover:text-gray-600 duration-200 font-semibold";
            }}
          >
            <Icon />
            <span> {label}</span>
          </NavLink>
        </li>
      )),
    []
  );
  return (
    <div className="bg-white shadow-sm shadow-gray-400">
      <nav className="max-w-7xl px-4 mx-auto">
        <ul className="flex gap-4 h-14 items-center">
          <div className="mr-auto">
            <Logo isFullText />
          </div>
          {renderedLinks}
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
