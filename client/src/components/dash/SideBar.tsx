import { NavLink } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { FiUser, FiLayers, FiMessageSquare } from "react-icons/fi";
import Logo from "../ui/Logo";
const links = [
  {
    label: "Profile",
    to: "/dash/profile",
    icon: FiUser,
  },
  {
    label: "Messages",
    to: "/dash/messages",
    icon: FiMessageSquare,
  },
  {
    label: "Rooms",
    to: "/dash/rooms",
    icon: FiLayers,
  },
];
const SideBar = () => {
  return (
    <aside className="bg-white w-20 p-4 flex flex-col justify-between items-center">
      <div>
        <Logo />
      </div>
      <ul className="space-y-4">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <li key={l.label}>
              <NavLink
                className="flex flex-col gap-1 items-center bg-blue-600 px-1 py-2 rounded-md text-gray-200 duration-200 hover:bg-blue-700"
                to={l.to}
              >
                <Icon />
                <span className="text-sm ">{l.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div>
        <LogOutButton />
      </div>
    </aside>
  );
};
export default SideBar;
