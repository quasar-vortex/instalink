import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/slices/auth.slice";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
