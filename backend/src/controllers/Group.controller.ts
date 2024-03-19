import { Request, Response, NextFunction } from "express";

import {
  addUserGroup,
  checkGroupExists,
  getMemberCountInGroup,
  getGroupByName,
  getGroupsByOrganizedBy,
  getUserGroupsQuery,
  getUserNameById,
  getMembersDetail,
} from "../database/UserQueries";
import { throwError } from "../utils/Error";
import { getImage, uploadToS3 } from "../utils/UploadToS3";
import getImageDimensions from "../utils/GetImageDimention";
import { getAllImages } from "../Types/GetAllImages";
export const getUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    } else {
      const userGroups = await getUserGroupsQuery(userId);

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
    const imageBuffer = file?.buffer;
    const groupExists = await checkGroupExists(name);
    if (groupExists.length) {
      return throwError(next, { name: "Group name already exists" });
    }
    if (!imageBuffer) {
      return throwError(next, { image: "Image not provided" });
    }
    const dimensions = await getImageDimensions(imageBuffer);
    if (dimensions.width !== 1920 || dimensions.height !== 1080) {
      return throwError(next, { image: "Image dimensions must be 1920x1080" });
    }
    if (!userId) {
      return throwError(next, "User not found");
    }

    const imageUrl = await uploadToS3(name, imageBuffer, file.mimetype);
    const newGroup = await addUserGroup(
      name,
      group_type,
      location,
      userId,
      about,
      imageUrl
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Group created successfully",
      data: newGroup,
    });
  } catch (error) {
    next(error);
  }
};
export const getGroupsByOrganizer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId: string | undefined = request?.user?.userId;
  if (!userId) {
    return throwError(next, "User not found");
  }
  try {
    const groups = await getGroupsByOrganizedBy(userId);
    response.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};
export const getGroupDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const name = request?.query?.name;
    const userId: string | undefined = request?.user?.userId;

    if (!userId) {
      return throwError(next, "User not found");
    }
    if (!name) {
      return throwError(next, "Group not found");
    }
    const group = await getGroupByName(name?.toString());
    const organized_by = await getUserNameById(group.organized_by);
    const organizedByImage = await getImage(organized_by?.image);
    const image = await getImage(group.image);
    const membersCount = await getMemberCountInGroup(group.group_id);
    const members = await getMembersDetail(group.group_id);
    const membersToSend = await getAllImages(members, next);
    response.status(200).json({
      success: true,
      message: "Group details fetched successfully",
      data: {
        ...group,
        organized_by: {
          name: organized_by?.name,
          image: organizedByImage,
        },
        image,
        membersCount,
        members: membersToSend,
      },
    });
  } catch (error) {
    next(error);
  }
};
