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
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Layout from "./components/ui/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { element: <Landing />, path: "/", index: true },
      { element: <Login />, path: "/login" },
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
