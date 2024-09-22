import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/slices/auth.slice";
import { FiPenTool } from "react-icons/fi";

const Profile = () => {
  const {
    firstName,
    lastName,
    userName,
    bio,
    email,
    avatarFileId,
    registeredDate,
  } = useSelector(selectUserInfo);

  return (
    <section className="flex flex-col justify-center items-center">
      <header className="flex justify-between p-4 w-full bg-slate-200 border-b-2 border-slate-400">
        <h2 className="font-bold text-lg">My Profile</h2>
        <button aria-label="Profile options">
          <FaEllipsisV />
        </button>
      </header>

      <article className="p-4 flex flex-col justify-center items-start gap-4 w-full max-w-md">
        <button
          title="Edit"
          className="ml-auto flex flex-col text-gray-600 items-center justify-center text-lg p-2 hover:text-blue-600  duration-200"
        >
          <FiPenTool />
          <span className="font-bold text-sm ">Edit</span>
        </button>
        <div className="rounded-full overflow-hidden w-40 h-40 mx-auto">
          <img
            src="https://i.pravatar.cc/200"
            alt={`${userName}'s profile picture`}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="mx-auto text-xl font-semibold">@{userName}</h4>

        <div className="my-4 border-t border-slate-300 w-full"></div>

        <section className="w-full px-4">
          <h5 className="font-bold">First Name:</h5>
          <p>{firstName}</p>

          <h5 className="font-bold">Last Name:</h5>
          <p>{lastName}</p>

          <h5 className="font-bold">Bio:</h5>
          <p>{bio || "No bio available."}</p>

          <h5 className="font-bold">Email:</h5>
          <p>{email}</p>

          <h5 className="font-bold">Member Since:</h5>
          {registeredDate}
        </section>
      </article>
    </section>
  );
};

export default Profile;
