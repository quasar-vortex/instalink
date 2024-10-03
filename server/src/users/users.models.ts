import z, { optional } from "zod";

export const baseUserSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email().max(100),
  password: z
    .string()
    .regex(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])).{8,16}$/, {
      message:
        "Password must be between 8 and 16 characters. Include one number, one uppercase letter, one lowercase letter, and one special character: @$!%*?&",
    }),
  confirmPassword: z
    .string()
    .regex(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])).{8,16}$/, {
      message:
        "Password must be between 8 and 16 characters. Include one number, one uppercase letter, one lowercase letter, and one special character: @$!%*?&",
    }),
  userName: z.string().regex(/^((?=.*[a-z])(?=.*\d)).{8,16}$/, {
    message:
      "Username must be between 8 and 16 characters. Include one number.",
  }),
});

export type UpdateUserModel = z.infer<typeof updateUserModel>["body"];
export const updateUserModel = z.object({
  body: baseUserSchema
    .pick({
      password: true,
      userName: true,
    })
    .extend({
      newPassword: z
        .string()
        .regex(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])).{8,16}$/, {
          message:
            "Password must be between 8 and 16 characters. Include one number, one uppercase letter, one lowercase letter, and one special character: @$!%*?&",
        })
        .optional(),
      bio: z.string().max(200).optional(),
      avatarFileId: z.string().max(36).optional(),
    }),
});
