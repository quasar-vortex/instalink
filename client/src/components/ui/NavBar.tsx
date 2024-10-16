import React from "react";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

type NavBarProps = {
  links: { icon: IconType; label: string; to: string }[];
};
const NavBar = ({ links }: NavBarProps) => {
  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white">
      <ul className="max-w-7xl gap-4 px-4 mx-auto flex justify-between items-center h-16">
        <li className="mr-auto">
          <NavLink className="text-lg font-bold" to="/">
            InstaLink
          </NavLink>
        </li>
        {links.map(({ icon: Icon, label, to }) => (
          <li key={label}>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "text-gray-800 hover:text-gray-900 underline duration-200 flex flex-col gap-1 items-center"
                  : "hover:underline text-gray-700 hover:text-gray-800 duration-200 flex flex-col gap-1 items-center";
              }}
              to={to}
            >
              <Icon className="text-lg" />
              <span className="font-bold text-sm">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
