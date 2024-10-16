import express, { ErrorRequestHandler } from "express";
import { authRouter } from "./routes/auth.routes";
import { appConfig } from "./config/env";
import { db } from "./config/db";
import { authMiddleware } from "./middleware/auth.middleware";
import HttpError from "./config/HttpError";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth/protected", authMiddleware, async (req, res, next) => {
  const user = await db.user.findUnique({
    //@ts-ignore
    where: { userId: req.user.id },
    select: { firstName: true, lastName: true },
  });
  if (!user)
    throw new HttpError({ status: "FORBIDDEN", message: "Not allowed" });
  const { firstName, lastName } = user;
  res.status(200).json({ message: `Welcome ${firstName} ${lastName}` });
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: "Internal Error" });
};
app.use(errorHandler);

const main = async () => {
  try {
    await db.$connect();
    app.listen(appConfig.port, () => console.log("Running On", appConfig.port));
  } catch (error) {
    console.log(error);
    await db.$disconnect();
    process.exit(1);
  }
};

main();
