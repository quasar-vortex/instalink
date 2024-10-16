import { useState } from "react";
import { FiLayers, FiMessageSquare, FiUser, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const dashLinks = [
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
    label: "Rooms",
    to: "/dash/rooms",
  },
];
export default function DashLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const renderLinks = () =>
    dashLinks.map(({ icon: Icon, label, to }) => (
      <li key={label}>
        <NavLink to={to}>
          <Icon />
          <span>{label}</span>
        </NavLink>
      </li>
    ));
  return (
    <>
      <aside>
        <div>
          <NavLink to="/dash">InstaLink</NavLink>
        </div>
        <nav>
          <ul>{renderLinks()}</ul>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
      <aside></aside>
    </>
  );
}
