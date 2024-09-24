import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../store/api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userRegisterSchema, {
  registerFields,
  RegisterSchema,
} from "../models/register";

const Register = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(userRegisterSchema) });
  const [registerUser] = useRegisterMutation();
  const onSubmit = async (payload: RegisterSchema) => {
    try {
      const { user, accessToken } = await registerUser(payload).unwrap();
      dispatch(setUser({ user, accessToken }));
      nav("/dash");
    } catch (error) {
      toast.warn(
        error instanceof Error
          ? error.message
          : "Something Went Wrong, Unable to Register."
      );
      console.error(error);
    }
  };
  return (
    <section className="bg-gray-100  flex-1 flex ">
      <div className="flex flex-col items-center justify-center flex-grow py-12">
        <h2 className="font-bold text-4xl mb-4">Register Account</h2>
        <p className="text-gray-700 text-lg mb-4">
          Register to start messaging.
        </p>
        <div className="bg-white shadow-md shadow-gray-300/70 p-6 rounded-md w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center flex-col text-black"
          >
            {registerFields.map((f) => (
              <div className="mb-4 w-full" key={f.name}>
                <label className="mb-2 block " htmlFor={f.name}>
                  {f.label}
                </label>
                <input
                  className="border outline-none border-gray-300 indent-2 py-1 text-lg w-full"
                  {...f}
                  {...register(f.name)}
                />
                {errors[f.name]?.message ? (
                  <span className="text-red-600 font-bold text-sm">
                    {errors[f.name]?.message}
                  </span>
                ) : null}
              </div>
            ))}
            <button type="submit" className="btn btn-blue">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
