import Container from "../../ui/Container";
import Card from "../../ui/Card";
import Form from "../../ui/form/Form";
import userRegisterSchema, {
  RegisterSchema,
  registerFields,
} from "../models/register";
import { FormField } from "../../../types";
import { FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../../../store/api/auth.api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [registerUser] = useRegisterMutation();
  const handleUserRegistration = async (data: RegisterSchema) => {
    try {
      const { accessToken, user } = await registerUser(data).unwrap();
      toast.success(`Welcome ${user.firstName} ${user.lastName}`);
      dispatch(setUser({ accessToken, user }));
      nav("/dash");
    } catch (error) {
      const errorMsg = `Unable to register user`;
      console.error(errorMsg + ": ", error);
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <section className="flex-grow flex py-12">
        <Container className="p-4 w-full flex flex-col  justify-center items-center">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold mb-2">Register Account</h2>
            <p className="text-gray-700 text-lg">
              Create an account to start messaging.
            </p>
          </div>

          <Card className="max-auto max-w-md w-full mb-4">
            <Form
              defaultValues={undefined}
              fields={registerFields as FormField<FieldValues>[]}
              schema={userRegisterSchema}
              onSubmit={
                handleUserRegistration as unknown as (data: FieldValues) => void
              }
            />
          </Card>
          <NavLink
            to="/login"
            className="underline text-gray-600 hover:text-gray-900 duration-200"
          >
            Have an account?
          </NavLink>
        </Container>
      </section>
    </>
  );
};

export default Register;
