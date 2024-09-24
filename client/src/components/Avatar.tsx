import { NavLink } from "react-router-dom";

type AvatarProps = {
  imgUrl?: string;
  userName: string;
  userId: string;
  size?: "sm" | "md" | "lg";
  isClickable?: boolean;
};
const Avatar = ({
  userId,
  imgUrl = "https://i.pravatar.cc/200",
  userName,
  size = "sm",
  isClickable = false,
}: AvatarProps) => {
  const { sm, md, lg } = {
    sm: {
      containerClass: "flex flex-col justify-center gap-2",
      textClass: "mx-auto font-semibold",
      imgClass: "w-full h-full object-cover ",
      imgWrapperClass:
        "rounded-full overflow-hidden w-20 h-20 mx-auto border-[3px] border-indigo-600 shadow-md shadow-slate-400",
    },
    md: {
      containerClass: "flex flex-col justify-center gap-2",
      textClass: "mx-auto text-lg font-semibold",
      imgClass: "w-full h-full object-cover ",
      imgWrapperClass:
        "rounded-full overflow-hidden w-24 h-24 mx-auto border-[3px] border-indigo-600 shadow-md shadow-slate-400",
    },
    lg: {
      containerClass: "flex flex-col justify-center gap-2",
      textClass: "mx-auto text-xl font-semibold",
      imgClass: "w-full h-full object-cover ",
      imgWrapperClass:
        "rounded-full overflow-hidden w-28 h-28 mx-auto border-[3px] border-indigo-600 shadow-md shadow-slate-400",
    },
  };
  const { containerClass, imgClass, imgWrapperClass, textClass } =
    size === "sm" ? sm : size === "md" ? md : lg;
  if (isClickable)
    return (
      <NavLink className={`${containerClass}`} to={`/dash/users/${userId}`}>
        <div className={imgWrapperClass}>
          <img
            src={imgUrl}
            alt={`${userName}'s profile picture`}
            className={imgClass}
          />
        </div>
        <h4 className={textClass}>@{userName}</h4>
      </NavLink>
    );
  else
    return (
      <div className={containerClass}>
        <div className={imgWrapperClass}>
          <img
            src={imgUrl}
            alt={`${userName}'s profile picture`}
            className={imgClass}
          />
        </div>
        <h4 className={textClass}>@{userName}</h4>
      </div>
    );
};

export default Avatar;
