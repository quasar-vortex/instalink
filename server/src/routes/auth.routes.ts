import { Router } from "express";
import { valMiddleware } from "../middleware/validation.middleware";
import { loginUserModel, registerUserModel } from "../models/auth.models";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
export const authRouter = Router();

authRouter
  .post(
    "/register",
    valMiddleware(registerUserModel),
    authController.registerUserHandler
  )
  .post(
    "/login",
    valMiddleware(loginUserModel),
    authController.loginUserHandler
  )
  .get("/refresh", authController.refreshUserHandler)
  .get("/logoff", authMiddleware, authController.logOffUserHandler);
