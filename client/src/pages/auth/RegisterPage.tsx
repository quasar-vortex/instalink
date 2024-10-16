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
  registerFields,
  registerSchema,
  RegisterUserSchema,
} from "@/lib/models/authModels";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { useRegisterUserMutation } from "@/api/auth/authApi";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const nav = useNavigate();
  const dis = useDispatch();
  const form = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    },
  });
  const [registerUser] = useRegisterUserMutation();
  const onSubmit = async (data: RegisterUserSchema) => {
    try {
      const { user, accessToken } = await registerUser(data).unwrap();
      dis(setUser({ user, accessToken }));
      nav("/dash");
    } catch (error) {
      console.log(error);
    }
  };
  const renderFields = () =>
    registerFields.map((f) => {
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
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription className="text-lg">
              Register to begin messaging.
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
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <NavLink
            className="text-center underline inline-block text-gray-600 hover:text-gray-800"
            to="/login"
          >
            Have an account?
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
