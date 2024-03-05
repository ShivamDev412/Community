import { getImage } from "./../utils/UploadToS3";
import { Request, Response, NextFunction } from "express";
import { getUserById, updateUserProfileById } from "../database/UserQueries";
import { throwError } from "../utils/Error";
import { EditProfileSchema } from "../utils/Validation";
import { uploadToS3 } from "../utils/UploadToS3";

export const GetUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const user = await getUserById(userId);

      res.status(200).json(user);
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const editUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, address, bio, image } = EditProfileSchema.parse(req.body);
  const file = req.file;
  try {
    const imageToSend = file
      ? await uploadToS3(name, file?.buffer, file.mimetype)
      : image;

    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const bioToSend = bio ? bio : "";
      if (imageToSend) {
        await updateUserProfileById(
          userId,
          name,
          imageToSend,
          JSON.parse(bioToSend),
          address
        );
        const updatedUser = await getUserById(userId);
        const imageData = file ? await getImage(updatedUser?.image) : image;
        if (imageData) {
          res.status(201).json({
            success: true,
            data: {
              ...updatedUser,
              image: imageData,
            },
            message:"Profiled updated successfully"
          });
        } else {
          return throwError(next, "Something went wrong while uploading image");
        }
      } else {
        return throwError(next, "Something went wrong while uploading image");
      }
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
