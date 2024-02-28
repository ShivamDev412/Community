import { Request, Response, NextFunction } from "express";

import {
  addUserGroup,
  getUserById,
  getUserGroups,
} from "../database/UserQueries";
import { throwError } from "../utils/Error";
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

export const GetUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    } else {
      const userGroups = await getUserGroups(userId);

      res.status(200).json(userGroups);
    }
  } catch (error) {
    next(error);
  }
};

export const createUserGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { about, name, group_type, location } = req.body;
    const userId: string | undefined = req?.user?.userId;
    const file = req?.file;
    if (!userId) {
      return throwError(next, "User not found");
    } else {
      if (!file) {
        return throwError(next, "Image not provided");
      }
      const imageUrl = await uploadToS3(name, file?.buffer, file.mimetype);
      const newGroup = await addUserGroup(
        name,
        group_type,
        location,
        userId,
        about,
        imageUrl
      );
      res.status(200).json({

        success: true,
        message: "Group created successfully",
        data: newGroup,
      });
    }
  } catch (error) {
    next(error);
  }
};
