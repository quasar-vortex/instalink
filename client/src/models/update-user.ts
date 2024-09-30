import { FormField } from "../types";
import baseUserSchema from "./user";
import z from "zod";

const updateUserSchema = baseUserSchema
  .pick({ email: true, password: true })
  .extend({
    newPassword: baseUserSchema.shape.password.optional(),
    avatarFileId: z.string().max(36).optional(),
    bio: z.string().max(200).optional(),
    newUserName: z.string().min(8).max(16).optional(),
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updateUserFields: FormField<UpdateUserSchema>[] = [
  {
    label: "New User Name",
    placeholder: "Enter a new user name...",
    type: "text",
    name: "newUserName",
    isOptional: true,
  },
  {
    label: "Bio",
    placeholder: "Enter your bio...",
    type: "textarea",
    name: "bio",
    isOptional: true,
  },
  {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    name: "password",
  },
  {
    label: "New Password",
    placeholder: "Enter new password...",
    type: "password",
    name: "newPassword",
  },
];

export default updateUserSchema;
