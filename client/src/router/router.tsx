import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";

import { ToastContainer } from "react-toastify";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashLayout from "@/layouts/DashLayout";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "@/features/auth/authSlice";
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useSelector(selectIsSignedIn);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <PrivateRoute element={<DashLayout />} />,
    children: [
      { path: "/dash", element: <Navigate to="/dash/profile" /> },
      { path: "/dash/profile" },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
