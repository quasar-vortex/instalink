import { FormField } from "../types";
import baseUserSchema from "./user";
import z from "zod";

const userRegisterSchema = baseUserSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  })
  .extend({
    userName: z.string().regex(/^[a-zA-Z0-9]{6,12}/, {
      message:
        "User name can only include uppercase letters, lowercase letters, and numbers. Must be between 6 and 12 characters long.",
    }),
    confirmPassword: baseUserSchema.shape.password,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof userRegisterSchema>;

export const registerFields: FormField<RegisterSchema>[] = [
  {
    label: "First Name",
    placeholder: "Enter your first name...",
    type: "text",
    name: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "Enter your last name...",
    type: "text",
    name: "lastName",
  },
  {
    label: "Email",
    placeholder: "Enter your email address...",
    type: "email",
    name: "email",
  },
  {
    label: "User Name",
    placeholder: "Enter your user name...",
    type: "text",
    name: "userName",
  },
  {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    name: "password",
  },
  {
    label: "Confirm Password",
    placeholder: "Confirm your password...",
    type: "password",
    name: "confirmPassword",
  },
];

export default userRegisterSchema;
