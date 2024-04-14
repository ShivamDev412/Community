import { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { throwError } from "../utils/Error";
import {
  getImage,
  uploadCompressedImageToS3,
  uploadToS3,
} from "../utils/UploadToS3";
import getImageDimensions from "../utils/GetImageDimension";
import { getAllImages } from "../Types/GetAllImages";
import { getLatitudeAndLongitude } from "../utils/GetLatitudeAndLongitude";
import db from "../database/db.config";
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
      const userGroups = await db.userGroup.findMany({
        where: {
          user_id: userId,
        },
        include: {
          group: true,
        },
      });
      res.status(200).json({
        success: true,
        message: "User groups fetched successfully",
        data: userGroups,
      });
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
    const groupExists = await db.group.findMany({
      where: {
        name,
      },
    });
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
    const locationCoord = await getLatitudeAndLongitude(location);
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
    const newGroup = await db.group.create({
      data: {
        name,
        group_type,
        location,
        organized_by: userId,
        about,
        image: imageUrl,
        compressed_image: compressedImageUrl,
        latitude,
        longitude,
      },
    });
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
    const groupData = await db.group.findFirst({
      where: {
        id: groupId,
      },
    });
    console.log(groupData, name);
    if (groupData?.name !== name) {
      const groupExists = await db.group.findUnique({
        where: {
          name,
        },
      });
      if (groupExists) {
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
    imageUrl = imageUrl ? imageUrl : groupData?.image ? groupData?.image : "";
    compressedImageUrl = compressedImageUrl
      ? compressedImageUrl
      : groupData?.compressed_image
      ? groupData?.compressed_image
      : "";
    let latitude;
    let longitude;
    const locationCoord = await getLatitudeAndLongitude(location);
    if (locationCoord) {
      latitude = locationCoord.latitude;
      longitude = locationCoord.longitude;
    }
    const updatedGroup = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        name,
        group_type,
        location,
        about,
        image: imageUrl,
        compressed_image: compressedImageUrl,
        latitude,
        longitude,
      },
    });
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
    const groups = await db.group.findMany({
      where: {
        organized_by: userId,
      },
    });
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
    const group = await db.group.findFirst({
      where: {
        name: name?.toString(),
      },
    });
    if (group) {
      const organizedBy = await db.user.findFirst({
        where: {
          id: group.organized_by,
        },
        select: {
          name: true,
          image: true,
          compressed_image: true,
          id: true,
        },
      });
      if (organizedBy) {
        const organizedByImage =
          organizedBy.image && organizedBy.image.includes("https://")
            ? organizedBy.image
            : organizedBy.image
            ? await getImage(organizedBy.image)
            : null;
        const compressedOrganizedByImage =
          organizedBy.compressed_image &&
          organizedBy.compressed_image.includes("https://")
            ? organizedBy.compressed_image
            : organizedBy.compressed_image
            ? await getImage(organizedBy.compressed_image)
            : null;
        const image = await getImage(group.image || "");
        const compressedImage = await getImage(group.compressed_image || "");
        const membersCount = await db.userGroup.count({
          where: {
            group_id: group.id,
          },
        });
        const members = await db.userGroup.findMany({
          where: {
            group_id: group.id,
          },
        });
        const membersToSend = await getAllImages(members, next);
        response.status(200).json({
          success: true,
          message: "Group details fetched successfully",
          data: {
            ...group,
            organized_by: {
              id: group.organized_by,
              name: organizedBy?.name,
              image: organizedByImage,
              compressed_image: compressedOrganizedByImage,
            },
            image,
            compressed_image: compressedImage,
            membersCount,
            members: membersToSend,
          },
        });
      }
    }
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
    const groupId: any = request?.query?.groupId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    if (!groupId) {
      return throwError(next, "Group ID is missing");
    }

    const eventsWithImages = await getAllImages(
      await db.event.findMany({
        where: {
          group_id: groupId,
        },
      }),
      next
    );

    const eventIds = eventsWithImages.map((event) => event.event_id);
    const members = await Promise.all(
      eventIds.map(async (eventId) => {
        const eventMembers = await db.userEvent.findMany({
          where: {
            event_id: eventId,
          },
          include: {
            user: true,
          },
        });
        const membersWithImages = await Promise.all(
          eventMembers.map(async (member) => ({
            ...member,
            image: await getImage(member?.user?.image || ""),
            compressed_image: await getImage(
              member.user.compressed_image || ""
            ),
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
export const deleteGroup = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const groupId: any = request?.query?.groupId;
    if (!groupId) {
      return throwError(next, "Group ID is missing");
    }
    await db.group.update({
      where: { id: groupId },
      data: {
        deletion_request_date: new Date(),
      },
    });
    schedule.scheduleJob(new Date(Date.now() + 10 * 60 * 1000), async () => {
      try {
        await db.group.delete({
          where: {
            id: groupId,
          },
        });
        await db.event.deleteMany({
          where: {
            group_id: groupId,
          },
        });
        await db.userGroup.deleteMany({
          where: {
            group_id: groupId,
          },
        });
        response.status(200).json({
          success: true,
          message: "Group deleted successfully",
        });
      } catch (error) {
        next(error);
      }
    });

    response.status(200).json({
      success: true,
      message: `Deletion scheduled. Group will be deleted in 10 minutes.`,
    });
  } catch (error) {
    next(error);
  }
};
