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
  getAllEventsByGroupId,
  getEventMembersCountById,
  getEventMembers,
  updateUserGroupQuery,
  getGroupById,
} from "../database/UserQueries";
import { throwError } from "../utils/Error";
import {
  getImage,
  uploadCompressedImageToS3,
  uploadToS3,
} from "../utils/UploadToS3";
import getImageDimensions from "../utils/GetImageDimention";
import { getAllImages } from "../Types/GetAllImages";
import { getLatitudeAndLongitude } from "../utils/GetLatitudeAndLongitude";
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
    const { about, name, group_type, location, locationId } = req.body;
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
    let latitude;
    let longitude;
    const locationCoord = await getLatitudeAndLongitude(locationId);
    if (locationCoord) {
      latitude = locationCoord.latitude;
      longitude = locationCoord.longitude;
    }
    const imageUrl = await uploadToS3(name, imageBuffer, file.mimetype);
    const compressedImageUrl = await uploadCompressedImageToS3(
      name,
      imageBuffer,
      file.mimetype
    );
    const newGroup = await addUserGroup(
      name,
      group_type,
      location,
      userId,
      about,
      imageUrl,
      compressedImageUrl,
      latitude,
      longitude
    );
    res.status(200).json({
      success: true,
      message: "Group created successfully",
      data: newGroup,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUserGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { about, name, group_type, location, image } = req.body;

    const groupId = req?.params?.groupId;
    const userId: string | undefined = req?.user?.userId;
    const file = req?.file;
    const imageBuffer = file?.buffer;
    const groupData = await getGroupById(groupId);
    if (groupData.name !== name) {
      const groupExists = await checkGroupExists(name);
      if (groupExists.length) {
        return throwError(next, { name: "Group name already exists" });
      }
    }
    let imageUrl = "";
    let compressedImageUrl = "";
    if (!image) {
      if (!imageBuffer) {
        return throwError(next, { image: "Image not provided" });
      }
      const dimensions = await getImageDimensions(imageBuffer);
      if (dimensions.width !== 1920 || dimensions.height !== 1080) {
        return throwError(next, {
          image: "Image dimensions must be 1920x1080",
        });
      }
      if (!userId) {
        return throwError(next, "User not found");
      }

      imageUrl = await uploadToS3(name, imageBuffer, file.mimetype);
      compressedImageUrl = await uploadCompressedImageToS3(
        name,
        imageBuffer,
        file.mimetype
      );
    }
    imageUrl = imageUrl ? imageUrl : groupData.image;
    compressedImageUrl = compressedImageUrl
      ? compressedImageUrl
      : groupData.compressed_image;
    const updatedGroup = await updateUserGroupQuery(
      groupId,
      name,
      group_type,
      location,
      about,
      imageUrl,
      compressedImageUrl
    );
    res.status(201).json({
      success: true,
      message: "Group updated successfully",
      data: updatedGroup,
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
    const organizedByImage = organized_by?.image.includes("https://")
      ? organized_by?.image
      : await getImage(organized_by?.image);
    const compressedOrganizedByImage = organized_by?.image.includes("https://")
      ? organized_by?.image
      : await getImage(organized_by?.compressed_image);
    const image = await getImage(group.image);
    const compressedImage = await getImage(group.compressed_image);
    const membersCount = await getMemberCountInGroup(group.group_id);
    const members = await getMembersDetail(group.group_id);
    const membersToSend = await getAllImages(members, next);
    response.status(200).json({
      success: true,
      message: "Group details fetched successfully",
      data: {
        ...group,
        organized_by: {
          id: group.organized_by,
          name: organized_by?.name,
          image: organizedByImage,
          compressed_image: compressedOrganizedByImage,
        },
        image,
        compressed_image: compressedImage,
        membersCount,
        members: membersToSend,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getAllEventsInGroup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = request?.user?.userId;
    const groupId = request?.query?.groupId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    if (!groupId) {
      return throwError(next, "Group ID is missing");
    }

    const eventsWithImages = await getAllImages(
      await getAllEventsByGroupId(groupId),
      next
    );

    const eventIds = eventsWithImages.map((event) => event.event_id);
    const members = await Promise.all(
      eventIds.map(async (eventId) => {
        const eventMembers = await getEventMembers(eventId);
        const membersWithImages = await Promise.all(
          eventMembers.map(async (member) => ({
            ...member,
            image: await getImage(member.image),
            compressed_image: await getImage(member.compressed_image),
          }))
        );
        return membersWithImages;
      })
    );

    const eventsToSend = eventsWithImages.map((event, index) => ({
      ...event,
      members: members[index],
    }));

    response.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: eventsToSend,
    });
  } catch (error) {
    next(error);
  }
};
