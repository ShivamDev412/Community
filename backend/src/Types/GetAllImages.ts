import { NextFunction } from "express";
import { throwError } from "../utils/Error";
import { getImage } from "../utils/UploadToS3";

export const getAllImages = async (data: any, next: NextFunction) => {
  return await Promise.all(
    data.map(async (data: any) => {
      try {
        const image = await getImage(data.image);
        if (image) {
          return {
            ...data,
            image: image,
          };
        }
        return null;
      } catch (error) {
        return throwError(next, "Error fetching image:");
      }
    })
  );
};
