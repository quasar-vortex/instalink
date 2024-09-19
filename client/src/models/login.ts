import { FormField } from "../types";
import baseUserSchema from "./user";
import z from "zod";
const userLoginSchema = baseUserSchema.pick({ email: true, password: true });
export default userLoginSchema;
export type LoginSchema = z.infer<typeof userLoginSchema>;

export const loginFields: FormField<LoginSchema>[] = [
  {
    label: "Email",
    placeholder: "Enter your email address...",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    name: "password",
  },
];
