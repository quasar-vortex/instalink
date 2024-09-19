import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectRequest,
} from "@aws-sdk/client-s3";
import { db } from "../config/db";
import { s3Config } from "../config/env";
import HttpError from "../config/http_error";
import { RequestHandler } from "express";
import {
  audioTypes,
  imgTypes,
  refineAudio,
  refineImage,
  refineVideo,
  s3Client,
  videoTypes,
} from "../middleware/upload.middleware";
import { v4 as uuid } from "uuid";
type AllowedFiles = "IMAGE" | "VIDEO" | "AUDIO";

const getKeyFromUrl = (url: string) => {
  let key = "";
  const parts = url.split("/");
  key = parts[parts.length - 1];
  return key;
};
export const uploadFileHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "No file uploaded.",
      });
    const userId = req.user!.id;
    let fileType: AllowedFiles = "IMAGE";
    let refinedBuffer: Buffer;
    const mimeType = req.file.mimetype;

    if (imgTypes.includes(mimeType)) {
      refinedBuffer = await refineImage(req.file.buffer);
      fileType = "IMAGE";
    } else if (audioTypes.includes(mimeType)) {
      refinedBuffer = await refineAudio(req.file.buffer);
      fileType = "AUDIO";
    } else if (videoTypes.includes(mimeType)) {
      refinedBuffer = await refineVideo(req.file.buffer);
      fileType = "VIDEO";
    } else
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Invalid File Type",
      });

    const fileKey = uuid();
    const params: PutObjectCommandInput = {
      Bucket: s3Config.bucket,
      Key: fileKey,
      Body: refinedBuffer,
      ContentType: mimeType,
      ACL: "public-read",
    };
    const dbPayload = {
      originalName: req.file.originalname,
      url: `https://${s3Config.bucket}.${s3Config.endpoint}/${fileKey}`,
      size: refinedBuffer.length, // Save buffer length in bytes, divide by 1024 for KB
      fileType,
      userId,
    };
    await s3Client.send(new PutObjectCommand(params));
    const newFile = await db.file.create({ data: { ...dbPayload } });
    res.status(201).json(newFile);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*
Leaving access to files open for now
Could restrict on if a user is in a room with a file or if they have a message with that file 
*/
export const getFileByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const fileId = req.params.fileId as string;
    const foundFile = await db.file.findUnique({ where: { id: fileId } });
    if (!foundFile)
      throw new HttpError({ status: "NOT_FOUND", message: "File not found." });
    return res.status(200).json(foundFile);
  } catch (error) {
    next(error);
  }
};

export const deleteFileByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const fileId = req.params.fileId as string;
    const foundFile = await db.file.findUnique({ where: { id: fileId } });
    if (!foundFile)
      throw new HttpError({ status: "NOT_FOUND", message: "File not found." });
    const signedInId = req.user!.id;
    if (foundFile.userId !== signedInId)
      throw new HttpError({
        status: "FORBIDDEN",
        message: "May not delete another's file.",
      });
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: s3Config.bucket,
        Key: getKeyFromUrl(foundFile.url),
      })
    );
    await db.file.delete({ where: { id: fileId } });
    return res.status(200).json({ message: "File Deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateFileByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "No file uploaded.",
      });
    const signedInId = req.user!.id;
    const fileId = req.params.fileId as string;

    const dbFile = await db.file.findUnique({ where: { id: fileId } });
    if (!dbFile)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "No file found to update.",
      });

    let fileType: AllowedFiles = "IMAGE";
    let refinedBuffer: Buffer;
    const mimeType = req.file.mimetype;

    if (imgTypes.includes(mimeType)) {
      refinedBuffer = await refineImage(req.file.buffer);
      fileType = "IMAGE";
    } else if (audioTypes.includes(mimeType)) {
      refinedBuffer = await refineAudio(req.file.buffer);
      fileType = "AUDIO";
    } else if (videoTypes.includes(mimeType)) {
      refinedBuffer = await refineVideo(req.file.buffer);
      fileType = "VIDEO";
    } else
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Invalid File Type",
      });

    const fileKey = getKeyFromUrl(dbFile.url);
    const params: PutObjectCommandInput = {
      Bucket: s3Config.bucket,
      Key: fileKey,
      Body: refinedBuffer,
      ContentType: mimeType,
      ACL: "public-read",
    };
    const dbPayload = {
      originalName: req.file.originalname,
      url: `https://${s3Config.bucket}.${s3Config.endpoint}/${fileKey}`,
      size: refinedBuffer.length, // Save buffer length in bytes, divide by 1024 for KB
      fileType,
      userId: signedInId,
    };
    await s3Client.send(new PutObjectCommand(params));
    const updatedFile = await db.file.update({
      where: { id: fileId },
      data: { ...dbPayload },
    });
    res.status(201).json(updatedFile);
  } catch (error) {
    next(error);
  }
};
