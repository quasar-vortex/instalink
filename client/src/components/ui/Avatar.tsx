import clsx from "clsx";
import { NavLink } from "react-router-dom";

type AvatarProps = {
  isClickable?: boolean;
  userId: string;
  userName: string;
  imgUrl: string;
  size?: "sm" | "md" | "lg";
  direction?: "row" | "column";
  bio?: string;
};
const Avatar = ({
  imgUrl,
  userId,
  userName,
  isClickable = true,
  size = "md",
  direction = "column",
  bio,
}: AvatarProps) => {
  const Av = () => (
    <div
      className={clsx({
        "flex items-center": true,
        "flex-col": direction === "column",
      })}
    >
      <div
        className={clsx({
          "rounded-full overflow-hidden border-2 border-blue-600 shadow-md shadow-gray-400 ":
            true,
          "h-10 w-10 ": size === "sm",
          "h-14 w-14 ": size === "md",
          "h-16 w-16": size === "lg",
        })}
      >
        <img src={imgUrl} alt={userName + " avatar"} />
      </div>
      <p
        className={clsx({
          "text-gray-700 font-bold": true,
          "text-sm": size === "sm",
          "text-lg": size === "lg",
        })}
      >
        {userName}
      </p>
      {bio && (
        <div className="self-start my-4 px-4">
          <h6 className="font-bold">Bio:</h6>
          <p className="text-gray-700 font-semibold">{bio}</p>
        </div>
      )}
    </div>
  );
  return isClickable ? (
    <NavLink to={`/dash/users/${userId}`}>
      <Av />
    </NavLink>
  ) : (
    <Av />
  );
};

export default Avatar;
