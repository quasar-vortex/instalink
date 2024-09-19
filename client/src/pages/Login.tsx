import userLoginSchema, { loginFields, LoginSchema } from "../models/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../store/api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(userLoginSchema) });
  const [loginUser] = useLoginMutation();
  const onSubmit = async (payload: LoginSchema) => {
    try {
      const { user, accessToken } = await loginUser(payload).unwrap();
      dispatch(setUser({ user, accessToken }));
      nav("/dash");
    } catch (error) {
      toast.warn(
        error instanceof Error
          ? error.message
          : "Something Went Wrong, Unable to Login."
      );
      console.error(error);
    }
  };
  return (
    <section className="bg-gray-200  flex-1 flex ">
      <div className="flex flex-col items-center justify-center flex-grow py-12">
        <h2 className="font-bold text-4xl mb-4">Login</h2>
        <p className="text-gray-700 text-lg mb-4">Login to start messaging.</p>
        <div className="bg-white shadow-md shadow-gray-300/70 p-6 rounded-md w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center flex-col text-black"
          >
            {loginFields.map((f) => (
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

export default Login;
