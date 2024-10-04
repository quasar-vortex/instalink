import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import argon from "argon2";
import { File, PrismaClient, User } from "@prisma/client";
import { refineImage, s3Client } from "../../src/middleware/upload.middleware";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3Config } from "../../src/config/env";
import path from "path";

const db = new PrismaClient();
const ADMIN_USER = {
  id: "f1779b26-38f0-484d-adeb-0ba2f606c5c3",
  password: "Sunny$89",
  email: "admin@mail.com",
  firstName: "Jeremy",
  lastName: "Barber",
  userName: "admin1234",
  bio: `Jeremy Barber is a tech support specialist and full-stack developer with experience in React, Node.js, SQL, and Linux, focused on creating efficient solutions and building modern web applications.`,
};

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

const createAvatar = async (userId: string) => {
  const file = await fs.readFile(path.join(__dirname, "./avatar.png"));

  let refinedBuffer: Buffer;
  const mimeType = "image/png";
  refinedBuffer = await refineImage(file);

  const fileKey = uuid();
  const params: PutObjectCommandInput = {
    Bucket: s3Config.bucket,
    Key: fileKey,
    Body: refinedBuffer,
    ContentType: mimeType,
    ACL: "public-read",
  };
  const dbPayload: Partial<File> = {
    originalName: "avatar.png",
    url: `https://${s3Config.bucket}.${s3Config.endpoint}/${fileKey}`,
    size: refinedBuffer.length, // Save buffer length in bytes, divide by 1024 for KB
    fileType: "IMAGE",
    userId,
  };
  await s3Client.send(new PutObjectCommand(params));

  const updatedUser = await db.$transaction(async (transaction) => {
    const newFile = await transaction.file.create({
      data: {
        originalName: dbPayload.originalName!,
        fileType: dbPayload.fileType!,
        url: dbPayload.url!,
        size: dbPayload.size!,
        userId: dbPayload.userId!,
      },
    });

    return await transaction.user.update({
      where: { id: dbPayload.userId! },
      data: { avatarFileId: newFile.id },
    });
  });
  return updatedUser;
};
const main = async () => {
  const mockUsers = JSON.parse(
    await fs.readFile(path.join(__dirname, "users.json"), "utf-8")
  ) as {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    onboardComplete: boolean;
    registeredDate: string | Date;
    lastLoginDate: string | Date;
  }[];
  await db.$connect();

  await truncateFiles();
  await db.user.deleteMany();

  console.log("Creating dev user.");
  const { password, ...restOfAdmin } = ADMIN_USER;
  const devUser = await db.user.create({
    data: {
      ...restOfAdmin,
      passwordHash: await argon.hash(ADMIN_USER.password),
    },
  });
  console.log("Creating mock users.");
  const testUsers = await db.user.createMany({
    data: await Promise.all(
      mockUsers.map(async (i) => {
        const { password, ...restOfUser } = i;
        return { ...restOfUser, passwordHash: await argon.hash(password) };
      })
    ),
  });
  console.log("Adding avatar to users");
  const updatedUsers = await Promise.all(
    mockUsers.map(async (user) => {
      return await createAvatar(user.id!);
    })
  );
  await createAvatar(ADMIN_USER.id);

  console.log("Adding mock users as friends");
  const friends = await Promise.all(
    mockUsers.map(async (user) => {
      return await db.friend.create({
        data: { senderId: devUser.id!, receiverId: user.id! },
      });
    })
  );

  console.log(devUser, friends);
  console.log(await db.user.count());
};

main();
