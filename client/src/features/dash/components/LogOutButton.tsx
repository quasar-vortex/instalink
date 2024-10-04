import Button from "../../ui/Button";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLogOffMutation } from "../../../store/api/auth.api";
import { toast } from "react-toastify";
import { removeUser } from "../../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [removeCredentials, { isLoading }] = useLogOffMutation();

  const handleLogOff = async () => {
    try {
      const { message } = await removeCredentials().unwrap();
      dispatch(removeUser());
      toast.success(message);
      nav("/login");
    } catch (error) {
      const msg = "Unable to Sign Off";
      console.error(msg, +": ", error);
      toast.error(msg);
    }
  };
  return (
    <Button
      onClick={handleLogOff}
      disabled={isLoading}
      className="flex flex-col items-center rounded-md "
    >
      <FiChevronRight className="text-lg" />
      <span className="whitespace-nowrap text-sm gap-1">Out</span>
    </Button>
  );
};

export default LogOutButton;
