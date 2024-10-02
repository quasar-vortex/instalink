import { useSelector } from "react-redux";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import { FiPenTool } from "react-icons/fi";
import { selectUserInfo } from "../../store/slices/auth.slice";
import DashPanel from "../../components/dash/DashPanel";

const Profile = () => {
  const { userName, bio, firstName, lastName, registeredDate, email } =
    useSelector(selectUserInfo);

  return (
    <DashPanel
      title="Profile"
      headerActions={
        <Button className="px-2 py-2 flex gap-1 items-center">
          <FiPenTool />
          <span className="text-sm">Edit</span>
        </Button>
      }
      middle={
        <Avatar
          imgUrl="https://i.pravatar.cc/200"
          userId="1"
          userName={userName!}
          isClickable={false}
          bio={bio}
          size="lg"
        />
      }
    >
      <h6 className="font-bold">First Name:</h6>
      <p className="text-gray-700 font-semibold">{firstName}</p>
      <h6 className="font-bold">Last Name:</h6>
      <p className="text-gray-700 font-semibold">{lastName}</p>
      <h6 className="font-bold">Email:</h6>
      <p className="text-gray-700 font-semibold">{email}</p>
      <h6 className="font-bold">Date Registered:</h6>
      <p className="text-gray-700 font-semibold">
        {new Date(registeredDate!).toLocaleDateString()}
      </p>
    </DashPanel>
  );
};

export default Profile;
