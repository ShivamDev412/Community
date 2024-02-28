import AWS from "aws-sdk";
import dotenv from "dotenv";
import sharp from "sharp";
dotenv.config();
export const uploadToS3 = async (
  name: string,
  image: any,
  contentType: any
) => {
  const compressedImage = await sharp(image).resize({
    width: 1920,
    height: 1080,
    fit: "contain",
  }).toBuffer();
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `group_images/${name}-${Date.now()}`,
    Body: compressedImage,
    ContentType: contentType,
    // ACL: "public-read",
  };
  console.log(params, "params");
  try {
    const s3UploadResult = await s3.upload(params).promise();
    const imageUrl = s3UploadResult.Location;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};
