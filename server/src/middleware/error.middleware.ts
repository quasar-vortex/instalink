import { ErrorRequestHandler } from "express";
import HttpError from "../config/http_error";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err?.message || "INTERNAL_ERROR" });
};
