import { db } from "../config/db";
import HttpError from "../config/HttpError";
import { RegisterUserModel } from "../models/auth.models";
import { baseUserSelect } from "../models/user.models";
import * as authUtils from "../utils/auth.utils";

export const registerUser = async ({
  confirmPassword,
  password,
  ...rest
}: RegisterUserModel) => {
  if (password !== confirmPassword)
    throw new HttpError({
      status: "BAD_REQUEST",
      message: "Passwords must match.",
    });
  const user = await db.user.findFirst({
    where: { OR: [{ email: rest.email }, { userName: rest.userName }] },
  });

  if (user) {
    throw new HttpError({
      status: "BAD_REQUEST",
      message: "Email or User Name Taken.",
    });
  }
  const newUser = await db.user.create({
    data: {
      ...rest,
      passwordHash: await authUtils.hashPassword(password),
    },
    select: { ...baseUserSelect },
  });
  const [accessToken, refreshToken] = [
    authUtils.signUserToken({
      payload: { id: newUser.userId },
      type: "ACCESS_TOKEN",
    }),
    authUtils.signUserToken({
      payload: { id: newUser.userId },
      type: "REFRESH_TOKEN",
    }),
  ];
  await db.user.update({
    where: { userId: newUser.userId },
    data: {
      refreshToken,
      lastActive: new Date().toISOString(),
    },
  });
  return {
    tokens: { accessToken, refreshToken },
    user: newUser,
  };
};
export const logOffUser = async (id: string) => {
  await db.user.update({
    where: { userId: id },
    data: { refreshToken: null },
  });
  return { message: "User Logged Out" };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: { email: data.email },
    select: { ...baseUserSelect, passwordHash: true },
  });

  if (!user) {
    throw new HttpError({
      status: "NOT_AUTHORIZED",
      message: "Email or Password Invalid.",
    });
  }
  const { passwordHash, ...restOfUser } = user;
  if (!(await authUtils.verifyHashedPassword(passwordHash, data.password))) {
    throw new HttpError({
      status: "NOT_AUTHORIZED",
      message: "Email or Password Invalid.",
    });
  }

  const [accessToken, refreshToken] = [
    authUtils.signUserToken({
      payload: { id: user.userId },
      type: "ACCESS_TOKEN",
    }),
    authUtils.signUserToken({
      payload: { id: user.userId },
      type: "REFRESH_TOKEN",
    }),
  ];
  const updated = await db.user.update({
    where: { userId: restOfUser.userId },
    data: {
      refreshToken,
      lastActive: new Date().toISOString(),
    },
    select: { ...baseUserSelect },
  });
  return {
    tokens: { accessToken, refreshToken },
    user: updated,
  };
};

export const refreshUser = async (token: string) => {
  const { id } = await authUtils.verifyUserToken({
    type: "REFRESH_TOKEN",
    payload: token,
  });
  const user = await db.user.findUnique({
    where: { userId: id },
    select: { ...baseUserSelect, refreshToken: true },
  });

  if (!user || token !== user.refreshToken) {
    throw new HttpError({
      status: "NOT_AUTHORIZED",
      message: "Invalid User.",
    });
  }

  const accessToken = authUtils.signUserToken({
    payload: { id: user.userId },
    type: "ACCESS_TOKEN",
  });

  const updated = await db.user.update({
    where: { userId: id },
    data: {
      lastActive: new Date().toISOString(),
    },
    select: { ...baseUserSelect },
  });
  return {
    accessToken,
    user: updated,
  };
};
