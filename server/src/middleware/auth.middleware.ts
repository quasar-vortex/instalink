import { RequestHandler } from "express";
import HttpError from "../config/http_error";
import { verifyUserToken } from "../auth/auth.utils";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = (req.headers.authorization ||
      req.headers.Authorization) as string | undefined;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "No token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Token not provided properly.",
      });
    }
    const user = await verifyUserToken({
      payload: token,
      type: "ACCESS",
    });
    if (!user || !user.id) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Token verification failed.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
