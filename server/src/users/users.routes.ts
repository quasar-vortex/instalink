import { Router } from "express";
import * as userController from "./users.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/zod.middleware";
import { updateUserModel } from "./users.models";

export const usersRouter = Router();

usersRouter
  .get("/me", authMiddleware, userController.getSignedInUserInfoHandler)
  .patch(
    "/me",
    authMiddleware,
    validationMiddleware(updateUserModel),
    userController.updateSignedInUserHandler
  )
  .patch("/me/avatar", authMiddleware, userController.updateSignedInAvatar)
  .get("/:id", authMiddleware, userController.getUserByIdHandler);
