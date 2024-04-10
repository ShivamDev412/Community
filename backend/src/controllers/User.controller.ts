import { getImage, uploadCompressedImageToS3 } from "./../utils/UploadToS3";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import {
  addUserInterest,
  getAllCategoriesQuery,
  getAllInterestsQuery,
  getEventMembersCountById,
  getEventsCreatedByUser,
  getEventsRSVPByUser,
  getGroupNameAndLocationById,
  getGroupsCreatedByUser,
  getPastEventsAttendedByUser,
  getUserById,
  getUserInterests,
  getUserNameById,
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
import db from "../database/db.config";

export const GetUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).json({
        success: true,
        data: user,
      });
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
    const compressedImageToSend = await uploadCompressedImageToS3(
      name,
      file?.buffer,
      file?.mimetype
    );
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const bioToSend = bio ? bio : "";
      if (imageToSend) {
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            name: name,
            image: imageToSend,
            compressed_image: compressedImageToSend,
            bio: JSON.parse(bioToSend),
            location: address ? address : "",
          },
        });
        const updatedUser = await db.user.findUnique({
          where: {
            id: userId,
          },
        });
        const imageData = file
          ? await getImage(updatedUser?.image || "")
          : image;
        const compressedImageData = file
          ? await getImage(updatedUser?.compressed_image || "")
          : compressedImageToSend;
        if (imageData) {
          res.status(201).json({
            success: true,
            data: {
              ...updatedUser,
              image: imageData,
              compressedImage: compressedImageData,
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
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            dob: formattedBirthday, 
            sex: gender,
            looking_for: lookingFor, 
            life_state: lifeStages,
          },
        });
        const updatedUser = await db.user.findUnique({
          where: {
            id:userId
          }
        })
        res.status(200).json({
          success: true,
          data: {
            ...updatedUser,
            image: await getImage(updatedUser?.image || ""),
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
      const existingUser: QueryResultRow | null = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          password: true,
        },
      });
      if (existingUser) {
        const isPasswordCorrect = await bcrypt.compare(
          currentPassword,
          existingUser.password
        );
        if (!isPasswordCorrect) {
          return throwError(next, "Current password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hashedPassword,
          },
        });
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
      const categories = await db.category.findMany();
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
      const interests = await db.interest.findMany({
        where: {
          category_id: categoryId,
        },
      });
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
      await db.userInterest.create({
        data: {
          user_id: userId,
          interest_id: interestId,
        },
      });
      const userInterests = await db.userInterest.findMany({
        where: {
          user_id: userId,
        },
        include: {
          interest: true,
        },
      });
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
      await db.userInterest.delete({
        where: {
          interest_id: interestId,
          user_id: userId,
        },
      });
      const userInterests = await db.userInterest.findMany({
        where: {
          user_id: userId,
        },
        include: {
          interest: true,
        },
      });
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
      const userInterests = await db.userInterest.findMany({
        where: {
          user_id: userId,
        },
        include: {
          interest: true,
        },
      });
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
    const groups = await db.group.findMany({
      where: {
        organized_by: userId,
      },
      select: {
        name: true,
        image: true,
        compressed_image: true,
      },
      orderBy: {
        created_at: "desc",
      },
      skip: offset,
    });
    const groupToSend = await Promise.all(
      groups.map(async (group) => {
        try {
          const image = await getImage(group.image || "");
          const compressed_image = await getImage(group.compressed_image || "");
          if (image && compressed_image) {
            return {
              ...group,
              image,
              compressed_image,
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
export const getUserEvents = async (
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
    let tab = req.query.tab as string;
    let pageNum = parseInt(req.query.page as string, 10) || 1;
    if (isNaN(pageNum) || pageNum < 1) {
      pageNum = 1;
    }
    const offset = (pageNum - 1) * pageSize;
    let events: any[] = [];
    switch (tab) {
      case "attending":
        events = await db.event.findMany({
          where: {
            user_events: {
              user_id: userId,
            },
          },
          skip: offset,
          take: pageSize,
        });
        break;
      case "hosting":
        events = await db.event.findMany({
          where: {
            host_id: userId,
          },
          skip: offset,
          take: pageSize,
        });
        break;
      case "past":
        // Assuming you have a field to indicate past events
        events = await db.event.findMany({
          where: {
            event_date: {
              lt: new Date(),
            },
          },
          skip: offset,
          take: pageSize,
        });
        break;
      default:
        return throwError(next, "Invalid tab provided");
    }

    // Process events and send response
    const eventsToSend = await Promise.all(
      events.map(async (event) => {
        return {
          ...event,
          image: await getImage(event.image || ""),
          compressed_image: await getImage(event.compressed_image || ""),
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: eventsToSend,
    });
  } catch (err) {
    next(err);
  }
};
