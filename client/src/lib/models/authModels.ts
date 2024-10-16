import { FormField } from "@/types";
import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});
export type LoginUserSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be at most 20 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be at most 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be at most 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .max(16, "Confirm password must be at most 16 characters"),
  userName: z.string().min(6).max(12),
});

export type RegisterUserSchema = z.infer<typeof registerSchema>;
export const loginFields: FormField<LoginUserSchema>[] = [
  {
    type: "email",
    label: "Email",
    placeholder: "Enter your email...",
    name: "email",
    defaultValue: !import.meta.env.PROD ? import.meta.env.VITE_EMAIL : "",
  },
  {
    type: "password",
    label: "Password",
    placeholder: "Enter your password...",
    name: "password",
    defaultValue: !import.meta.env.PROD ? import.meta.env.VITE_PASSWORD : "",
  },
];
export const registerFields: FormField<RegisterUserSchema>[] = [
  {
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name...",
    name: "firstName",
  },
  {
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name...",
    name: "lastName",
  },
  {
    type: "email",
    label: "Email",
    placeholder: "Enter your email...",
    name: "email",
  },
  {
    type: "password",
    label: "Password",
    placeholder: "Enter your password...",
    name: "password",
  },
  {
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm your password...",
    name: "confirmPassword",
  },
  {
    type: "text",
    label: "Username",
    placeholder: "Enter your username...",
    name: "userName",
  },
];
