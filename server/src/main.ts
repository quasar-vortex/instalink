import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRouter } from "./auth/auth.routes";
import { appConfig } from "./config/env";
import cookieParser from "cookie-parser";
import { db } from "./config/db";
import { filesRouter } from "./files/files.router";
import { usersRouter } from "./users/users.routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

const server = http.createServer();

const io = new Server(server);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/files", filesRouter);

app.use(errorMiddleware);

const main = async () => {
  try {
    await db.$connect();
    app.listen(appConfig.port, () =>
      console.log(`Server Running on Port: ${appConfig.port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

main();
