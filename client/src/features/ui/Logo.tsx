import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserInfo } from "../../store/slices/auth.slice";

const Logo = ({ isFullText = false }: { isFullText?: boolean }) => {
  const { firstName } = useSelector(selectUserInfo);
  return (
    <NavLink to={firstName ? "/dash" : "/"} className="">
      <span className="logo-text">{isFullText ? "InstaLink" : "ILink"}</span>
    </NavLink>
  );
};

export default Logo;
