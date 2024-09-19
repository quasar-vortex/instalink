import { Router } from "express";

import { upload } from "../middleware/upload.middleware";

import * as filesController from "./files.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const filesRouter = Router();

filesRouter
  .post(
    "/",
    authMiddleware,
    upload.single("file"),
    filesController.uploadFileHandler
  )
  .patch(
    "/:fileId",
    authMiddleware,
    upload.single("file"),
    filesController.updateFileByIdHandler
  )
  .get("/:fileId", authMiddleware, filesController.getFileByIdHandler)
  .delete("/:fileId", authMiddleware, filesController.deleteFileByIdHandler);
