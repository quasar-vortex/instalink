import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  loginFields,
  loginSchema,
  LoginUserSchema,
} from "@/lib/models/authModels";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { useLoginUserMutation } from "@/api/auth/authApi";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const dis = useDispatch();

  const defaultValues = loginFields.reduce((acc, field) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {});

  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues, // Use the default values
  });

  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: LoginUserSchema) => {
    try {
      const { user, accessToken } = await loginUser(data).unwrap();
      dis(setUser({ user, accessToken }));
      nav("/dash");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center py-12">
      <div className="container">
        <Card className="max-w-lg mx-auto w-full mb-8">
          <CardHeader className="text-center ">
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription className="text-lg">
              Login to begin messaging.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {loginFields.map((f) => {
                return (
                  <div key={f.label} className="mb-4">
                    <label className="block mb-2" htmlFor={f.name}>
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        className="outline-none border-2 border-zinc-300 focus:border-zinc-500 duration-200 rounded-sm indent-2 py-1 w-full"
                        placeholder={f.placeholder}
                        {...form.register(f.name)}
                      />
                    ) : (
                      <input
                        className="outline-none border-2 border-zinc-300 focus:border-zinc-500 duration-200 rounded-sm indent-2 py-1 w-full"
                        type={f.type}
                        placeholder={f.placeholder}
                        {...form.register(f.name)}
                      />
                    )}
                    {form.formState.errors[f.name]?.message && (
                      <p className="text-red-600 font-bold text-sm mt-2">
                        {form.formState.errors[f.name]?.message}{" "}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="flex justify-center">
                <Button className="text-lg font-bold" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <NavLink
            className="text-center underline inline-block text-gray-600 hover:text-gray-800"
            to="/register"
          >
            Need an account?
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
