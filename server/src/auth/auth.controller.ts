import { RequestHandler } from "express";
import { LoginSchema, RegisterSchema } from "./auth.models";
import { db } from "../config/db";
import HttpError from "../config/http_error";
import argon from "argon2";
import { signUserToken, verifyUserToken } from "./auth.utils";
import { appConfig } from "../config/env";
import { baseUserSelect } from "../users/users.controller";

export const registerUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, firstName, lastName, userName, password } =
      req.body as RegisterSchema;
    const foundUser = await db.user.findUnique({ where: { email } });
    if (foundUser)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "User exists already.",
      });
    // Make first upper
    let fName = firstName.toLowerCase(),
      lName = lastName.toLowerCase();
    const userPayload = {
      email,
      firstName: fName.charAt(0).toUpperCase() + fName.slice(1),
      lastName: lName.charAt(0).toUpperCase() + lName.slice(1),
      userName: userName.toLowerCase(),
      passwordHash: await argon.hash(password),
    };
    const newUser = await db.user.create({
      data: userPayload,
      select: baseUserSelect,
    });
    const tokenPayload = { id: newUser.id };
    const { accessToken, refreshToken } = {
      accessToken: signUserToken({
        payload: tokenPayload,
        type: "ACCESS",
      }),
      refreshToken: signUserToken({
        payload: tokenPayload,
        type: "REFRESH",
      }),
    };
    await db.user.update({
      where: { id: newUser.id },
      data: { refreshToken, lastLoginDate: new Date().toISOString() },
    });
    res.cookie("refreshToken", refreshToken, {
      // 7 days, minus one hour
      maxAge: 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000,
      httpOnly: true,
      secure: appConfig.node_env !== "development",
    });
    res.status(201).json({ user: newUser, accessToken });
  } catch (error) {
    next(error);
  }
};

export const loginUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginSchema;
    const foundUser = await db.user.findUnique({
      where: { email },
      select: { ...baseUserSelect, passwordHash: true },
    });
    if (!foundUser)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Invalid email or password.",
      });
    const { passwordHash, ...restOfUser } = foundUser;
    const isPassValid = await argon.verify(passwordHash, password);
    if (!isPassValid)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Invalid email or password.",
      });
    const tokenPayload = { id: foundUser.id };
    const { accessToken, refreshToken } = {
      accessToken: signUserToken({
        payload: tokenPayload,
        type: "ACCESS",
      }),
      refreshToken: signUserToken({
        payload: tokenPayload,
        type: "REFRESH",
      }),
    };
    await db.user.update({
      where: { id: foundUser.id },
      data: { refreshToken, lastLoginDate: new Date().toISOString() },
    });
    res.cookie("refreshToken", refreshToken, {
      // 7 days, minus one hour
      maxAge: 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000,
      httpOnly: true,
      secure: appConfig.node_env !== "development",
    });
    res.status(201).json({ user: restOfUser, accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "No token provided.",
      });
    const { id } = await verifyUserToken({
      payload: refreshToken,
      type: "REFRESH",
    });
    const foundUser = await db.user.findUnique({
      where: { id },
      select: baseUserSelect,
    });
    if (!foundUser)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "User not found.",
      });
    const accessToken = signUserToken({
      payload: { id: foundUser.id },
      type: "ACCESS",
    });

    res.status(200).json({ accessToken, user: foundUser });
  } catch (error) {
    next(error);
  }
};

export const logOffUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "No token found.",
      });

    const { id } = await verifyUserToken({
      payload: refreshToken,
      type: "REFRESH",
    });

    await db.user.update({
      where: { id },
      data: { refreshToken: null },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: appConfig.node_env !== "development",
    });

    res.status(200).json({ message: "Logged off." });
  } catch (error) {
    next(error);
  }
};
