import z from "zod";
import { baseUser } from "./user.models";

export type RegisterUserModel = z.infer<typeof registerUserModel>["body"];
export const registerUserModel = z.object({
  body: baseUser,
});
export type LoginUserModel = z.infer<typeof loginUserModel>["body"];
export const loginUserModel = z.object({
  body: baseUser.pick({ email: true, password: true }),
});
