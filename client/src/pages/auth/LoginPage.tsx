import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  const form = useForm<LoginUserSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
  const renderFields = () =>
    loginFields.map((f) => {
      return (
        <FormField
          key={f.name}
          control={form.control}
          name={f.name}
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col mb-4">
                <FormLabel className="font-semibold">{f.label}</FormLabel>
                <FormControl className="p-1 indent-1 rounded-md border-2 border-gray-300 focus:border-gray-500 duration-200 outline-none">
                  {f.type === "textarea" ? (
                    <textarea placeholder={f.placeholder} {...field} />
                  ) : (
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      {...field}
                    />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    });
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                {renderFields()}
                <Button className="mx-auto font-bold text-lg" type="submit">
                  Login
                </Button>
              </form>
            </Form>
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
