import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsLoggedIn } from "../store/slices/auth.slice";

const Protected = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default Protected;
