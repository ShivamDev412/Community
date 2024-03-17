import { Request, Response, NextFunction } from "express";

import {
  addUserGroup,
  checkGroupExists,
  getAllMembersInGroup,
  getGroupByName,
  getGroupsByOrganizedBy,
  getUserGroupsQuery,
  getUserNameById,
} from "../database/UserQueries";
import { throwError } from "../utils/Error";
import { getImage, uploadToS3 } from "../utils/UploadToS3";
import getImageDimensions from "../utils/GetImageDimention";
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
    console.log(groupExists, "groupExists");
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
    const image = await getImage(group.image);
    const members = await getAllMembersInGroup(group.group_id);
    response.status(200).json({
      success: true,
      message: "Group details fetched successfully",
      data: { ...group, organized_by, image, members },
    });
  } catch (error) {
    next(error);
  }
};
