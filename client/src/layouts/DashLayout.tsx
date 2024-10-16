import { useLogOffUserQuery } from "@/api/auth/authApi";
import { Button } from "@/components/ui/button";
import { removeUser } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiLayers,
  FiMessageSquare,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const dashLinks = [
  {
    icon: FiUser,
    label: "Profile",
    to: "/dash/profile",
  },
  {
    icon: FiMessageSquare,
    label: "Chats",
    to: "/dash/chats",
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

const SignOffButton = () => {
  const nav = useNavigate();
  const [triggerSignOff, setTriggerSignOff] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useLogOffUserQuery(null, {
    skip: !triggerSignOff,
  });
  useEffect(() => {
    if (triggerSignOff) {
      if (data && typeof data === "object" && data?.message) {
        toast.success(data.message);
      }
      if (isError) {
        console.error(error);
      }
      dispatch(removeUser());
      nav("/login");
    }
  }, [data, triggerSignOff, dispatch, nav, isError, error]);
  const handleSignOff = () => {
    setTriggerSignOff(true);
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleSignOff}
      className="text-sm flex items-center gap-1"
      type="button"
    >
      <span>Out</span>
      <FiChevronRight className="text-lg" />
    </Button>
  );
};
const DashSideBar = () => {
  const renderLinks = () =>
    dashLinks.map(({ icon: Icon, label, to }) => (
      <li key={label}>
        <NavLink
          className={({ isActive }) => {
            const activeClass = `flex flex-col items-center gap-1 border-2 p-2 duration-200 border-zinc-500 hover:scale-90`,
              className = `flex flex-col items-center gap-1 border-2 p-2 duration-200 border-zinc-300 hover:border-zinc-500`;
            return isActive ? activeClass : className;
          }}
          to={to}
        >
          <Icon className="text-lg" />
          <span className="text-sm font-semibold">{label}</span>
        </NavLink>
      </li>
    ));
  return (
    <aside className="border-r-2 border-zinc-300 w-24 flex flex-col justify-between">
      <div className="px-2 py-4 flex justify-center">
        <NavLink
          className="font-bold underline hover:text-zinc-600 duration-200"
          to="/dash"
        >
          ILink
        </NavLink>
      </div>
      <nav className="px-2 py-4">
        <ul className="flex flex-col gap-4">{renderLinks()}</ul>
      </nav>
      <div className="px-2 py-4 ">
        <SignOffButton />
      </div>
    </aside>
  );
};
export default function DashLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        <DashSideBar />
        <main>
          <Outlet />
        </main>
        <aside></aside>
      </div>
    </>
  );
}
