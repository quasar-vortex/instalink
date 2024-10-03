import { FormField } from "../types";
import baseUserSchema from "./user";
import z from "zod";

const updateUserSchema = baseUserSchema.pick({ password: true }).extend({
  newPassword: baseUserSchema.shape.password.optional(),
  avatarFileId: z.string().max(36).optional(),
  bio: z.string().max(200).optional(),
  userName: z.string().min(8).max(16),
  includeBio: z.boolean(),
  includeNewPassword: z.boolean(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updateUserFields: FormField<UpdateUserSchema>[] = [
  {
    label: "User Name",
    placeholder: "Enter a user name...",
    type: "text",
    name: "userName",
  },
  {
    label: "Include Bio",
    placeholder: "",
    type: "checkbox",
    name: "includeBio",
  },
  {
    label: "Bio",
    placeholder: "Enter your bio...",
    type: "textarea",
    name: "bio",
    dependsOn: {
      field: "includeBio",
      value: true,
    },
  },
  {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    name: "password",
  },
  {
    label: "Include New Password",
    placeholder: "",
    type: "checkbox",
    name: "includeNewPassword",
  },
  {
    label: "New Password",
    placeholder: "Enter new password...",
    type: "password",
    name: "newPassword",
    dependsOn: {
      field: "includeNewPassword",
      value: true,
    },
  },
];

export default updateUserSchema;
