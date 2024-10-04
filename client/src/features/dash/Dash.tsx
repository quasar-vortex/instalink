import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/slices/auth.slice";
import { Navigate } from "react-router-dom";

const Dash = () => {
  const { onboardComplete } = useSelector(selectUserInfo);
  const to = onboardComplete ? "/dash/messages" : "/dash/profile";
  return <Navigate to={to} />;
};

export default Dash;
