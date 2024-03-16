import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config();
// @ts-ignore
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});
export const uploadToS3 = async (
  name: string,
  image: any,
  contentType: any
) => {
  const compressedImage = await sharp(image)
    .resize({
      width: 1920,
      height: 1080,
      fit: "contain",
    })
    .toBuffer();
  const generateRandomName = (byteLength = 32) => {
    const randomBytes = crypto.randomBytes(byteLength);
    return randomBytes.toString("hex");
  };
  const randomImageName = generateRandomName();

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: randomImageName,
    Body: compressedImage,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return randomImageName;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
export const getImage = async (name: string) => {
  const getObjParam = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: name,
  };
  const command = new GetObjectCommand(getObjParam);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 * 7 });
  if (url) {
    return url;
  }
};
