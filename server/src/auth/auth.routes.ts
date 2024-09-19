import { Router } from "express";
import * as authController from "./auth.controller";
import { validationMiddleware } from "../middleware/zod.middleware";
import { loginSchema, registerSchema } from "./auth.models";

export const authRouter = Router();

authRouter
  .post(
    "/register",
    validationMiddleware(registerSchema),
    authController.registerUserHandler
  )
  .post(
    "/login",
    validationMiddleware(loginSchema),
    authController.loginUserHandler
  )
  .get("/refresh", authController.refreshUserHandler)
  .get("/logoff", authController.logOffUserHandler);
