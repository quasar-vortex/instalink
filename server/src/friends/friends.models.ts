import z from "zod";

export const sendFriendRequestModel = z.object({
  body: z.object({
    receiverId: z.string(),
  }),
});

export const respondToFriendRequestModel = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
});

export const friendsListQueryModel = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)) // Default to 1 if not provided
      .refine((val) => val > 0, {
        message: "Page must be a positive number.",
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)) // Default to 10 if not provided
      .refine((val) => val > 0, {
        message: "Limit must be a positive number.",
      }),
  }),
});
