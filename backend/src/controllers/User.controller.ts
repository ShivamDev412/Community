import { getImage } from "./../utils/UploadToS3";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import {
  addUserInterest,
  getAllCategoriesQuery,
  getAllInterestsQuery,
  getGroupsCreatedByUser,
  getUserById,
  getUserInterests,
  getUserPasswordById,
  removeUserInterest,
  updateUserPassword,
  updateUserProfileById,
  updateUserProfileInfo,
} from "../database/UserQueries";
import { throwError } from "../utils/Error";
import {
  EditProfileSchema,
  PersonalInfoSchema,
  ChangePasswordSchema,
} from "../utils/Validation";
import { uploadToS3 } from "../utils/UploadToS3";
import moment from "moment";
import { QueryResultRow } from "pg";

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
          address ? address : ""
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
            message: "Profiled updated successfully",
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
export const updateUserPersonalInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedData = PersonalInfoSchema.safeParse(req.body);
    if (parsedData.success) {
      const { birthday, gender, lookingFor, lifeStages } = parsedData.data;

      let formattedBirthday = null;
      if (birthday) {
        formattedBirthday = moment(birthday, "YYYY-MM-DD").format("YYYY-MM-DD");
      }
      const userId: string | undefined = req?.user?.userId;
      if (userId) {
        await updateUserProfileInfo(
          userId,
          formattedBirthday,
          gender,
          lookingFor,
          lifeStages
        );
        const updatedUser = await getUserById(userId);
        res.status(200).json({
          success: true,
          data: {
            ...updatedUser,
            image: await getImage(updatedUser?.image),
          },
          message: "Update Info updated successfully",
        });
      } else {
        return throwError(next, "User not found");
      }
    } else {
      return throwError(next, "Invalid data provided");
    }
  } catch (err) {
    next(err);
  }
};
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } =
      ChangePasswordSchema.parse(req.body);
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const existingUser: QueryResultRow | null = await getUserPasswordById(
        userId
      );
      if (existingUser) {
        const isPasswordCorrect = await bcrypt.compare(
          currentPassword,
          existingUser.password
        );
        if (!isPasswordCorrect) {
          return throwError(next, "Current password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPassword(userId, hashedPassword);
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      }
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const categories = await getAllCategoriesQuery();
      res.status(200).json({
        success: true,
        data: categories,
        message: "Categories fetched successfully",
      });
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const getInterestsByCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    const { categoryId } = req.params;
    if (userId) {
      const interests = await getAllInterestsQuery(categoryId);
      res.status(200).json({
        success: true,
        data: interests,
        message: "Interests fetched successfully",
      });
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const addUserInterests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { interestId } = req.body;
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      await addUserInterest(userId, interestId);
      const userInterests = await getUserInterests(userId);
      res.status(200).json({
        success: true,
        message: "Interests updated successfully",
        data: userInterests,
      });
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const removeUserInterests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { interestId } = req.params;
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      await removeUserInterest(userId, interestId);
      const userInterests = await getUserInterests(userId);
      res.status(200).json({
        success: true,
        message: "Interest removed successfully",
        data: userInterests,
      });
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const getUserAllInterests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const userInterests = await getUserInterests(userId);
      res.status(200).json({
        success: true,
        message: "Interests fetched successfully",
        data: userInterests,
      });
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};
export const getUserCreatedGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const pageSize = 10;

    let pageNum = parseInt(req.query.page as string, 10) || 1;
    if (isNaN(pageNum) || pageNum < 1) {
      pageNum = 1;
    }
    const offset = (pageNum - 1) * pageSize;
    const groups = await getGroupsCreatedByUser(userId, offset);
    const groupToSend = await Promise.all(
      groups.map(async (group) => {
        try {
          const image = await getImage(group.image);
          if (image) {
            return {
              ...group,
              image: image,
            };
          }
          return null;
        } catch (error) {
          return throwError(next, "Error fetching image:");
        }
      })
    );
    res.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      data: groupToSend,
    });
  } catch (err) {
    next(err);
  }
};
