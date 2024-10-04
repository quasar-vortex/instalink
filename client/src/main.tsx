import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Landing from "./features/landing/Landing";
import Login from "./features/auth/pages/Login";
import Layout from "./features/ui/Layout";
import Dash from "./features/dash/Dash";
import Profile from "./features/profile/pages/Profile";
import DashLayout from "./features/dash/components/DashLayout";
import Register from "./features/auth/pages/Register";
import EditProfile from "./features/profile/pages/EditProfile";
import FriendsList from "./features/friends/pages/FriendsList";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { element: <Landing />, path: "/", index: true },
      { element: <Login />, path: "/login" },
      { element: <Register />, path: "/register" },
    ],
  },
  {
    element: <DashLayout />,
    children: [
      { element: <Profile />, path: "/dash/profile" },
      { element: <EditProfile />, path: "/dash/profile/edit" },
      { element: <FriendsList />, path: "/dash/friends" },
    ],
  },
  { element: <Dash />, path: "/dash" },
  { element: <Navigate to="/" />, path: "*" },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
