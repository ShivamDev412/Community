import { getImage, uploadCompressedImageToS3 } from "../services/UploadToS3";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import {
  EditProfileSchema,
  PersonalInfoSchema,
  ChangePasswordSchema,
} from "../utils/Validation";
import { uploadToS3 } from "../services/UploadToS3";
import moment from "moment";
import { ClearCookie } from "../services/SetCookies";
import {
  cancelEvent,
  createNewUserInterest,
  findUser,
  findUserEvents,
  findUserInterest,
  findUserInterests,
  registerEvent,
  removeUserInterest,
  updateUser,
} from "../prisma/schema/User.schema";
import {
  findInterest,
  findInterestsByCategory,
} from "../prisma/schema/Interest.schema";
import { findGroupsByOrganizer } from "../prisma/schema/Group.schema";
import {
  findEvent,
  findEventMembers,
  findEventsOrganizedByUser,
} from "../prisma/schema/Event.schema";
import { findCategories } from "../prisma/schema/Category.schema";

export const LogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const cookies = req.cookies;
  const refreshToken = cookies["community-refresh-token"];

  if (!refreshToken) {
    return throwError(next, "No refresh token found");
  }
  const existingUser = await findUser(userId as string);
  const deleteRefreshTokenFromDb = await updateUser(userId as string, {
    refresh_token: existingUser?.refresh_token.filter((token) => {
      return token !== refreshToken;
    }),
  });

  if (!deleteRefreshTokenFromDb) {
    return throwError(next, "Something went wrong while logging out");
  } else {
    ClearCookie(res, "community-refresh-token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
};
export const GetUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const user = await findUser(userId, {
        id: true,
        name: true,
        image: true,
        compressed_image: true,
        bio: true,
        location: true,
        dob: true,
        sex: true,
        email: true,
        looking_for: true,
        life_state: true,
        joined_on: true,
        google_id: true,
      });

      const interests = await findUserInterests(userId);
      const imageData = user?.google_id
        ? user?.image
        : await getImage(user?.image || "");
      const compressedImageData = user?.google_id
        ? user?.image
        : await getImage(user?.compressed_image || "");
      res.status(200).json({
        success: true,
        data: {
          ...user,
          image: imageData,
          compressed_image: compressedImageData,
          interests: interests,
        },
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
  const user = await findUser(req.user?.id as string);
  try {
    const imageToSend = file
      ? await uploadToS3(name, file?.buffer, file.mimetype)
      : user?.image;
    const compressedImageToSend = file
      ? await uploadCompressedImageToS3(name, file?.buffer, file?.mimetype)
      : user?.compressed_image;

    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const bioToSend = bio ? bio : "";
      if (imageToSend) {
        await updateUser(userId, {
          name: name,
          image: imageToSend,
          compressed_image: compressedImageToSend,
          bio: JSON.parse(bioToSend),
          location: address ? address : "",
        });
        const updatedUser = await findUser(userId, {
          id: true,
          name: true,
          image: true,
          compressed_image: true,
          bio: true,
          location: true,
          dob: true,
          sex: true,
          email: true,
          looking_for: true,
          life_state: true,
          joined_on: true,
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
              compressed_image: compressedImageData,
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

      const userId: string | undefined = req?.user?.id;
      if (userId) {
        await updateUser(userId, {
          dob: `${birthday}T00:00:00Z`,
          sex: gender,
          looking_for: lookingFor,
          life_state: lifeStages,
        });
        const updatedUser = await findUser(userId);
        res.status(200).json({
          success: true,
          data: {
            ...updatedUser,
            image: updatedUser?.image?.includes("https://")
              ? updatedUser.image
              : await getImage(updatedUser?.image || ""),
            compressed_image: updatedUser?.image?.includes("https://")
              ? updatedUser.image
              : await getImage(updatedUser?.compressed_image || ""),
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
    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const existingUser = await findUser(userId, {
        password: true,
      });
      if (existingUser) {
        const isPasswordCorrect = await bcrypt.compare(
          currentPassword,
          existingUser?.password as string
        );
        if (!isPasswordCorrect) {
          return throwError(next, "Current password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUser(userId, {
          password: hashedPassword,
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
    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const categories = await findCategories();
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
    const userId: string | undefined = req?.user?.id;
    const { categoryId } = req.params;
    if (userId) {
      const interests = await findInterestsByCategory(categoryId);
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
    const userId: string | undefined = req?.user?.id;

    if (!userId) {
      return throwError(next, "User not found");
    }
    const interest = await findInterest(interestId);

    if (!interest) {
      return throwError(next, "Interest not found");
    }
    await createNewUserInterest(userId, interestId);
    const userInterests = await findUserInterests(userId);

    res.status(200).json({
      success: true,
      message: "Interest added to user successfully",
      data: userInterests,
    });
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
    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const userInterest = await findUserInterest(userId, interestId, {
        interest: true,
      });
      if (!userInterest) {
        return throwError(next, "User interest not found");
      }
      await removeUserInterest(userId, interestId);
      const userInterests = await findUserInterests(userId);
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
    const userId: string | undefined = req?.user?.id;
    if (userId) {
      const userInterests = await findUserInterests(userId);
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
    const userId: string | undefined = req.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const pageSize = 10;

    let pageNum = parseInt(req.query.page as string, 10) || 1;
    if (isNaN(pageNum) || pageNum < 1) {
      pageNum = 1;
    }
    const offset = (pageNum - 1) * pageSize;
    const groups = await findGroupsByOrganizer(userId, offset);
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
    const userId: string | undefined = req.user?.id;
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
    const today = moment().utc().startOf("day");
    switch (tab) {
      case "attending":
        events = await findUserEvents(
          userId,
          {
            event_date: {
              gte: today.toDate(),
            },
            event_end_time: {
              gt: moment.utc().toDate(),
            },
          },
          {
            event: true,
          },
          {
            event: {
              event_date: "asc",
            },
          },
          offset
        );
        events = events.map((event) => event.event);
        break;
      case "hosting":
        events = await findEventsOrganizedByUser(
          {
            host_id: userId,
            event_date: {
              gte: today.toDate(),
            },
          },
          offset
        );
        break;
      case "past":
        events = await findUserEvents(
          userId,
          {
            event_date: {
              lt: today.toDate(),
            },
            event_end_time: {
              lt: moment.utc().toDate(),
            },
          },
          {
            event: true,
          },
          {
            event: {
              event_date: "desc",
            },
          },
          offset
        );
        break;
      default:
        return throwError(next, "Invalid tab provided");
    }

    const eventsToSend = await Promise.all(
      events?.map(async (event) => {
        if (event.event) {
          return {
            ...event.event,
            image: await getImage(event?.event?.image || ""),
            compressed_image: await getImage(
              event?.event?.compressed_image || ""
            ),
            members: (await findEventMembers(event?.event?.id || "")).length,
          };
        } else
          return {
            ...event,
            image: await getImage(event?.image || ""),
            compressed_image: await getImage(event?.compressed_image || ""),
            members: (await findEventMembers(event?.id || "")).length,
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

export const registerToEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req.user?.id;
    const { eventId } = req.body;

    if (!userId) {
      return throwError(next, "User not found");
    }

    // Check if the event exists
    const event = await findEvent(eventId);

    if (!event) {
      return throwError(next, "Event not found");
    }

    // Create userEvent entry for the event
    await registerEvent(userId, eventId);
    res.status(200).json({
      success: true,
      message: "User registered to event successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const cancelRSVP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req.user?.id;
    const { eventId } = req.body;

    if (!userId) {
      return throwError(next, "User not found");
    }
    const event = findEvent(eventId);
    if (!event) {
      return throwError(next, "Event not found");
    }
    await cancelEvent(userId, eventId);
    res.status(200).json({
      success: true,
      message: "RSVP canceled successfully",
    });
  } catch (err) {
    next(err);
  }
};
