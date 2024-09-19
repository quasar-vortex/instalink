import z from "zod";

export const uploadFileModel = z.object({
  body: z.object({}),
});
