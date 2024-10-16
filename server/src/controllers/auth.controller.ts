import { NextFunction, Request, Response, RequestHandler } from "express";
import { LoginUserModel, RegisterUserModel } from "../models/auth.models";
import * as authService from "../services/auth.service";
import { appConfig } from "../config/env";
import HttpError from "../config/HttpError";

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = req.body as RegisterUserModel;
    const { tokens, user } = await authService.registerUser(userInfo);
    // Set http only refresh token
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000 * 7 - 60 * 60 * 1000, // 7 days minus 1 hr
      secure: appConfig.node_env === "production",
      httpOnly: true,
    });
    if (appConfig.node_env !== "production") {
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 60 * 15 * 1000, // 15 minutes
        secure: false,
        httpOnly: true,
      });
    }
    res.status(201).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = req.body as LoginUserModel;
    const { tokens, user } = await authService.loginUser(userInfo);
    // Set http only refresh token
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000 * 7 - 60 * 60 * 1000, // 7 days minus 1 hr
      secure: appConfig.node_env === "production",
      httpOnly: true,
    });
    if (appConfig.node_env !== "production") {
      res.cookie("accessToken", tokens.accessToken, {
        maxAge: 60 * 15 * 1000, // 15 minutes
        secure: false,
        httpOnly: true,
      });
    }
    res.status(201).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore

    const token = req.cookies?.refreshToken as string;
    if (!token)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Refresh Token Required.",
      });

    const { accessToken, user } = await authService.refreshUser(token);
    if (appConfig.node_env !== "production") {
      res.cookie("accessToken", accessToken, {
        maxAge: 60 * 15 * 1000, // 15 minutes
        secure: false,
        httpOnly: true,
      });
    }
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logOffUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const user_id = req.user!.id;

    await authService.logOffUser(user_id);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Signed Out!" });
  } catch (error) {
    next(error);
  }
};
