import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRouter } from "./auth/auth.routes";
import { appConfig, s3Config } from "./config/env";
import cookieParser from "cookie-parser";
import { db } from "./config/db";
import { filesRouter } from "./files/files.router";
import { usersRouter } from "./users/users.routes";
import { s3Client } from "./middleware/upload.middleware";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
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

const truncateFiles = async () => {
  const foundFiles = await db.file.findMany();
  const toDelete: string[] = [];
  foundFiles.forEach(async (i) => {
    let Key: string | string[] = i.url.split("/");
    Key = Key[Key.length - 1];
    console.log("Deleting File:", i.originalName, Key);
    toDelete.push(Key);
  });
  await Promise.all(
    toDelete.map(async (i) => {
      await s3Client.send(
        new DeleteObjectCommand({ Bucket: s3Config.bucket, Key: i })
      );
      await db.file.delete({
        where: {
          url: `https://${s3Config.bucket}.${s3Config.endpoint}/${i}`,
        },
      });
    })
  );
};
const main = async () => {
  try {
    await db.$connect();
    if (appConfig.node_env.toLocaleLowerCase() !== "production") {
      await truncateFiles();
    }
    app.listen(appConfig.port, () =>
      console.log(`Server Running on Port: ${appConfig.port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

main();
