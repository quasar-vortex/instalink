import z from "zod";
const baseUserSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email().max(100),
  password: z
    .string()
    .regex(/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])).{8,16}$/, {
      message:
        "Password must be between 8 and 16 characters. Include one number, one uppercase letter, one lowercase letter, and one special character: @$!%*?&",
    }),
});

export default baseUserSchema;
