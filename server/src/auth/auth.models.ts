import z from "zod";
import { baseUserSchema } from "../users/users.models";

export type RegisterSchema = z.infer<typeof registerSchema>["body"];

export const registerSchema = z.object({
  body: baseUserSchema
    .pick({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      userName: true,
    })

    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match.",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>["body"];

export const loginSchema = z.object({
  body: baseUserSchema.pick({
    email: true,
    password: true,
  }),
});
