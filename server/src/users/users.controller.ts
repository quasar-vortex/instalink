import argon from "argon2";

import { RequestHandler } from "express";
import { db } from "../config/db";
import HttpError from "../config/http_error";
import { UpdateUserModel } from "./users.models";
import { AuthenticatedRequestHandler } from "index";

export const baseUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  userName: true,
  email: true,
  lastLoginDate: true,
  registeredDate: true,
  avatarFileId: true,
  bio: true,
};

export type BaseUser = typeof baseUserSelect;

export const getSignedInUserInfoHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user!.id;
    const userInfo = await db.user.findUnique({
      where: { id: userId },
      select: baseUserSelect,
    });
    // user has been authenticated, account should exist
    if (!userInfo)
      throw new HttpError({
        status: "INTERNAL_ERROR",
        message: "Something Went Wrong",
      });
    return res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const updateSignedInUserHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user!.id;
    const { newUserName, password, avatarFileId, bio, newPassword } =
      req.body as UpdateUserModel;
    const foundUser = await db.user.findUnique({
      where: { id: userId },
      select: { ...baseUserSelect, passwordHash: true },
    });

    if (!foundUser)
      throw new HttpError({
        status: "INTERNAL_ERROR",
        message: "Something went wrong.",
      });
    const passwordHash = foundUser.passwordHash;
    const isPassValid = await argon.verify(passwordHash, password);
    if (!isPassValid)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Password provided was incorrect.",
      });
    const passToSave = newPassword
      ? await argon.hash(newPassword)
      : passwordHash;
    const payload = {
      avatarFileId: !avatarFileId ? null : foundUser.avatarFileId,
      bio,
      passwordHash: passToSave,
      userName: newUserName || foundUser.userName,
    };
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: payload,
      select: baseUserSelect,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id as string;
    const userInfo = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        avatarFileId: true,
        bio: true,
      },
    });

    if (!userInfo)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "User not found",
      });
    return res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};
