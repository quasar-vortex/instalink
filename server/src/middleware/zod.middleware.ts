import z from "zod";
import { RequestHandler } from "express";

type Schema = z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;

export const validationMiddleware: (s: Schema) => RequestHandler =
  (s) => async (req, res, next) => {
    try {
      await s.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Check your input.", error: error.issues });
      }
      next(error);
    }
  };
