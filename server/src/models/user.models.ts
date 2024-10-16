import z from "zod";

export const baseUserSelect = {
  userId: true,
  userName: true,
  email: true,
  bio: true,
  notificationsEnabled: true,
  statusVisibility: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
  lastActive: true,
};
export type BaseUser = z.infer<typeof baseUser>;
export const baseUser = z.object({
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
  userName: z.string(),
});

export const refineUser = (user: z.ZodEffects<z.AnyZodObject>) => {
  return user.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
};
