import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Form from "../components/ui/form/Form";
import userLoginSchema, { loginFields, LoginSchema } from "../models/login";
import { FormField } from "../types";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../store/api/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../store/slices/auth.slice";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isError, isSuccess, isLoading }] = useLoginMutation();
  const handleUserLogin = async (data: LoginSchema) => {
    try {
      const { accessToken, user } = await loginUser(data).unwrap();
      toast.success(
        `Welcome ${user.userName} ${user.firstName} ${user.lastName}`
      );
      dispatch(setUser({ accessToken, user }));
      nav("/dash");
    } catch (error) {
      const errorMsg = `Unable to login user`;
      console.error(errorMsg + ": ", error);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="flex-grow flex">
        <Container className="p-4 w-full flex flex-col  justify-center items-center">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold mb-2">Login to Account</h2>
            <p className="text-gray-700 text-lg">Login to start messaging.</p>
          </div>

          <Card className="max-auto max-w-md w-full">
            <Form
              fields={loginFields as FormField<FieldValues>[]}
              schema={userLoginSchema}
              onSubmit={
                handleUserLogin as unknown as (data: FieldValues) => void
              }
            />
          </Card>
        </Container>
      </section>
    </>
  );
};

export default Login;
