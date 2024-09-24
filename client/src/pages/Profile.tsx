import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/slices/auth.slice";
import { FiPenTool } from "react-icons/fi";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { id, firstName, lastName, userName, bio, email, registeredDate } =
    useSelector(selectUserInfo);
  const nav = useNavigate();
  return (
    <section className="flex flex-col flex-1 h-full">
      <header className="flex justify-between p-4 w-full  border-b-2 border-slate-400">
        <h2 className="font-bold text-lg">My Profile</h2>
        <button title="Profile Options">
          <FaEllipsisV />
        </button>
      </header>

      <article className="bg-gray-100 p-4 flex flex-col gap-4 w-full flex-grow overflow-y-auto mx-auto">
        <button
          onClick={() => nav("/dash/profile/edit")}
          title="Edit"
          className="border-2 border-slate-300 rounded-sm hover:border-slate-600 ml-auto flex flex-col text-gray-600 items-center justify-center text-lg p-2 hover:text-blue-600  duration-200"
        >
          <FiPenTool />
          <span className="font-bold text-sm ">Edit</span>
        </button>
        <Avatar size="lg" userId={id!} userName={userName!} />

        <div className="my-4 border-t border-slate-300 w-full"></div>

        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <div>
              <h5 className="font-bold">First Name:</h5>
              <p>{firstName}</p>
            </div>
            <div>
              <h5 className="font-bold">Last Name:</h5>
              <p>{lastName}</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold">Bio:</h5>
            <p>{bio || "No bio."}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <h5 className="font-bold">Member Since:</h5>
              <p>{registeredDate}</p>
            </div>
            <div>
              <h5 className="font-bold">Email:</h5>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Profile;
