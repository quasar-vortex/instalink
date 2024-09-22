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
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import DashLayout from "./components/DashLayout";
import Profile from "./pages/Profile";
import MessageList from "./pages/MessageList";
import Dash from "./pages/Dash";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Login />,
        path: "/",
        index: true,
      },
      {
        element: <Register />,
        path: "/register",
      },
    ],
  },
  {
    element: <DashLayout />,
    children: [
      {
        element: <Dash />,
        path: "/dash/",
      },
      {
        element: <MessageList />,
        path: "/dash/messages",
      },
      {
        element: <Profile />,
        path: "/dash/profile",
      },
    ],
  },
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
