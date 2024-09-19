import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Config } from "../config/env";
import HttpError from "../config/http_error";
import sharp from "sharp";
import { PassThrough } from "stream";
import ffmpeg from "fluent-ffmpeg";
export const s3Client = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.key,
    secretAccessKey: s3Config.secret,
  },
  endpoint: "https://" + s3Config.endpoint,
});

export const imgTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const audioTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp3",
  "audio/aac",
  "audio/flac",
  "audio/webm",
];
export const videoTypes = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
];

export const allowedMimeTypes = [...imgTypes, ...audioTypes, ...videoTypes];

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
  fileFilter(req, file, callback) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new HttpError({
          status: "BAD_REQUEST",
          message: "File type not supported. Must be image, video, or audio.",
        })
      );
    }
    callback(null, true);
  },
});

export const refineImage = async (buffer: Buffer) => {
  return sharp(buffer)
    .resize(800, 800, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("webp", { quality: 80 })
    .toBuffer();
};

// Helper function to convert a Buffer to a Readable Stream
const bufferToStream = (buffer: Buffer) => {
  const stream = new PassThrough();
  stream.end(buffer);
  return stream;
};

export const refineAudio = async (buffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const inputStream = bufferToStream(buffer);
    const outputChunks: Buffer[] = [];

    ffmpeg(inputStream)
      .audioBitrate(128)
      .format("mp3")
      .on("error", (err) => {
        reject(
          new HttpError({
            status: "BAD_REQUEST",
            message: `Audio processing failed: ${err.message}`,
          })
        );
      })
      .on("end", () => {
        resolve(Buffer.concat(outputChunks));
      })
      .pipe(new PassThrough())
      .on("data", (chunk) => {
        outputChunks.push(chunk);
      });
  });
};

export const refineVideo = async (buffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const inputStream = bufferToStream(buffer);
    const outputChunks: Buffer[] = [];

    ffmpeg(inputStream)
      .videoCodec("libx264")
      .audioCodec("aac")
      .videoBitrate(800)
      .format("mp4")
      .on("error", (err) => {
        reject(
          new HttpError({
            status: "BAD_REQUEST",
            message: `Video processing failed: ${err.message}`,
          })
        );
      })
      .on("end", () => {
        resolve(Buffer.concat(outputChunks));
      })
      .pipe(new PassThrough())
      .on("data", (chunk) => {
        outputChunks.push(chunk);
      });
  });
};
