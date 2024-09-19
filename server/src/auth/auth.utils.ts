import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { accessConfig, refreshConfig } from "../config/env";
import HttpError from "../config/http_error";

export type UserTokenType = "ACCESS" | "REFRESH";
export type SignUserTokenPayload = {
  id: string;
} & Partial<User>;
export const signUserToken = ({
  payload,
  type,
}: {
  payload: SignUserTokenPayload;
  type: UserTokenType;
}) => {
  const { secret, expiresIn } =
    type === "ACCESS" ? accessConfig : refreshConfig;
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyUserToken = async ({
  payload,
  type,
}: {
  payload: string;
  type: UserTokenType;
}): Promise<SignUserTokenPayload> => {
  return new Promise((res, rej) => {
    jwt.verify(
      payload,
      type === "ACCESS" ? accessConfig.secret : refreshConfig.secret,
      (err, payload) => {
        if (err)
          rej(
            new HttpError({
              status: "NOT_AUTHORIZED",
              message: "Token is not valid.",
            })
          );
        res(payload as SignUserTokenPayload);
      }
    );
  });
};
