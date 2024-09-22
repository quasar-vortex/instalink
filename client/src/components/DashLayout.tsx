import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  FiUser,
  FiUsers,
  FiLayers,
  FiMessageSquare,
  FiSettings,
  FiChevronRight,
} from "react-icons/fi";
import { FaEllipsisV } from "react-icons/fa";
import { IconType } from "react-icons/lib";
const links = [
  {
    icon: FiUser,
    label: "Profile",
    to: "/dash/profile",
  },
  {
    icon: FiMessageSquare,
    label: "Messages",
    to: "/dash/messages",
  },
  {
    icon: FiUsers,
    label: "Friends",
    to: "/dash/friends",
  },
  {
    icon: FiLayers,
    label: "Groups",
    to: "/dash/groups",
  },
  {
    icon: FiSettings,
    label: "Settings",
    to: "/dash/settings",
  },
];

const SideBar = () => {
  return (
    <aside className="w-20 bg-slate-200 flex flex-col justify-between border-r-2 border-slate-400">
      <div className="flex py-4 justify-center">
        <NavLink
          className="font-bold text-lg text-blue-600 underline-offset-4 underline"
          to="/dash"
        >
          ILink
        </NavLink>
      </div>
      <ul className="flex flex-col py-4 justify-center">
        {links.map((l) => (
          <li className="mb-4 " key={l.label}>
            <DashLink {...l} />
          </li>
        ))}
      </ul>
      <div className="flex 1 items-center py-4 justify-center">
        <button
          className="btn btn-blue text-gray-300 flex-col flex gap-2 items-center"
          title="Sign Out"
        >
          <FiChevronRight />
          <span className="text-sm ">Out</span>
        </button>
      </div>
    </aside>
  );
};
const PlaceHolder = () => {
  return <div></div>;
};

type DashLinkProps = {
  icon: IconType;
  label: string;
  to: string;
};
const DashLink = (l: DashLinkProps) => {
  const Icon = l.icon;
  return (
    <NavLink
      className={({ isActive }) => {
        if (isActive)
          return "flex [&>span]:text-blue-600 flex-col items-center gap-2 justify-center text-lg bg-slate-300 p-4 text-blue-600  duration-200";
        else
          return "flex flex-col items-center gap-2 justify-center text-lg text-gray-800 p-4 border border-slate-300  duration-200 hover:bg-slate-300";
      }}
      title={l.label}
      to={l.to}
    >
      <Icon />
      <span className="text-sm font-bold text-gray-600">{l.label}</span>
    </NavLink>
  );
};
const DashLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <PlaceHolder />
      </div>
    </>
  );
};

export default DashLayout;
