import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import {
  getImage,
  uploadCompressedImageToS3,
  uploadToS3,
} from "../utils/UploadToS3";
import getImageDimensions from "../utils/GetImageDimension";
import { getLatitudeAndLongitude } from "../utils/GetLatitudeAndLongitude";
import db from "../database/db.config";

export const getTags = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId: string | undefined = request?.user?.userId;
  if (!userId) {
    return throwError(next, "User not found");
  }

  try {
    const interests = await db.interest.findMany();

    response.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      data: interests,
    });
  } catch (error) {
    next(error);
  }
};
export const createEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      details,
      date,
      time,
      event_end_time,
      type,
      tags,
      group,
      location,
      link,
    } = request.body;
    console.log(request.body);
    const userId: string | undefined = request?.user?.userId;
    const file = request?.file;
    const imageBuffer = file?.buffer;
    const eventExists = await db.event.findFirst({
      where: {
        name,
      },
    });
    if (eventExists) {
      return throwError(next, { name: "Event name already exists" });
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
    } else {
      if (!file) {
        return throwError(next, "Image not provided");
      }
      const linkToSend = type === "online" ? link : null;
      const locationToSend = type === "in-person" ? location : null;
      const tagsToSend = JSON.parse(tags);
      const imageUrl = await uploadToS3(name, file?.buffer, file.mimetype);
      const compressedImageUrl = await uploadCompressedImageToS3(
        name,
        file?.buffer,
        file.mimetype
      );
      let latitude = 0;
      let longitude = 0;
      if (type === "in-person") {
        const locationCoord = await getLatitudeAndLongitude(location);
        if (locationCoord) {
          latitude = locationCoord.latitude;
          longitude = locationCoord.longitude;
        }
      }
      const newEvent = await db.event.create({
        data: {
          name,
          image: imageUrl,
          compressed_image: compressedImageUrl,
          details,
          host_id: userId,
          group_id: group,
          event_date: `${date}T00:00:00Z`,
          event_time: new Date(`${date}T${time}:00Z`).toISOString(), // Convert event time to ISO-8601 string
          event_end_time: new Date(
            `${date}T${event_end_time}:00Z`
          ).toISOString(),
          event_type: type,
          link: linkToSend,
          address: locationToSend,
          // tags: tagsToSend,
          latitude,
          longitude,
        },
      });
      await db.event.update({
        where: { id: newEvent.id },
        data: {
          tags: {
            connect: tagsToSend,
          },
        },
      });
      if (!newEvent) {
        return throwError(next, "Event not created");
      }
      response.status(200).json({
        success: true,
        message: "Event created successfully",
        data: newEvent,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getEventDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const eventId = req.params.eventId;
    const [event, eventMembers] = await Promise.all([
      db.event.findUnique({
        where: {
          id: eventId,
        }
      }),
      db.userEvent.findMany({
        where: {
          event_id: eventId
        },
        include: {
          user: true 
        }
      })
    ]);
    const [eventImage, compressedEventImage, host, group, members] =
      await Promise.all([
        getImage(event?.image || ""),
        getImage(event?.compressed_image || ""),
        db.user.findUnique({
          where: {
            id: event?.host_id,
          },
          select: {
            name: true,
            image: true,
            compressed_image: true,
            id: true,
          },
        }),
        db.group.findUnique({
          where: {
            id: event?.group_id,
          },
          select: {
            name: true,
            image: true,
            compressed_image: true,
            location: true,
            group_type: true,
          },
        }),
        Promise.all(
          eventMembers.map(async (user) => {
            try {
              const image = user?.user?.image?.includes("https://")
                ? user?.user.image
                : await getImage(user.user?.image || "");
              const compressedImage = user?.user?.image?.includes("https://")
                ? user.user?.image
                : await getImage(user.user?.compressed_image || "");
              return image ? { ...user, image, compressedImage } : null;
            } catch (error) {
              throw new Error("Error fetching image");
            }
          })
        ),
      ]);
    const hostImage = host
      ? host?.image?.includes("https://")
        ? host.image
        : await getImage(host?.image || "")
      : null;
    const hostCompressedImage = host
      ? host?.image?.includes("https://")
        ? host.image
        : await getImage(host?.compressed_image || "")
      : null;
    const groupImage = group ? await getImage(group?.image || "") : null;
    const groupCompressedImage = group
      ? await getImage(group?.compressed_image || "")
      : null;
    const membersToSend = members.map((member) => ({
      ...member,
      image: member?.image || null,
      compressed_image: member?.compressedImage || null,
      type: "member",
    }));

    membersToSend.unshift({
      ...host,
      image: hostImage || null,
      compressed_image: hostCompressedImage || null,
      type: "host",
    });

    res.status(200).json({
      success: true,
      message: "Event details fetched successfully",
      data: {
        ...event,
        image: eventImage,
        compressed_image: compressedEventImage,
        members: membersToSend,
        host: {
          ...host,
          image: hostImage,
          compressed_image: hostCompressedImage,
        },
        group: {
          ...group,
          group_id: event?.group_id,
          image: groupImage,
          compressed_image: groupCompressedImage,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
export const updateEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      details,
      date,
      time,
      event_end_time,
      type,
      tags,
      group,
      location,
      link,
      image,
    } = request.body;
    const userId: string | undefined = request?.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const eventId = request.params.eventId;
    const file = request?.file;
    const imageBuffer = file?.buffer;
    const event = await db.event.findUnique({
      where: {
        id: eventId,
      }
    });
    // Check if event name already exists and is not the same event
    if (event?.name !== name) {
      const eventExists = await db.event.findFirst({
        where: {
          id: eventId,
        }
      });
      if (eventExists) {
        return throwError(next, { name: "Event name already exists" });
      }
    }
    let imageUrl = "";
    let compressedImageUrl = "";
    // If image URL is not provided, check if image buffer is provided
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

      imageUrl = await uploadToS3(name, imageBuffer, file.mimetype);
      compressedImageUrl = await uploadCompressedImageToS3(
        name,
        imageBuffer,
        file.mimetype
      );
    }
    // If image URL is provided, use it instead of image buffer
    imageUrl = imageUrl ? imageUrl : event?.image || "";
    compressedImageUrl = compressedImageUrl
      ? compressedImageUrl
      : event?.compressed_image || "";

    const linkToSend = type === "online" ? link : null;
    const locationToSend = type === "in-person" ? location : null;
    const tagsToSend = JSON.parse(tags);
    let latitude = 0;
    let longitude = 0;
    if (type === "in-person") {
      const locationCoord = await getLatitudeAndLongitude(location);

      if (locationCoord) {
        latitude = locationCoord.latitude;
        longitude = locationCoord.longitude;
      }
    }
    const newEvent = await db.event.update({
      where: { id: eventId },
      data: {
        name,
        image: imageUrl,
        compressed_image: compressedImageUrl,
        details,
        host_id: userId,
        group_id: group,
        event_date: `${date}T00:00:00Z`,
        event_time: new Date(`${date}T${time}:00Z`).toISOString(),
        event_end_time: new Date(`${date}T${event_end_time}:00Z`).toISOString(),
        event_type: type,
        link: linkToSend,
        address: locationToSend,
        latitude,
        longitude,
      },
    });
    await db.event.update({
      where: { id: newEvent.id },
      data: {
        tags: {
          connect: tagsToSend,
        },
      },
    });
    if (!newEvent) {
      return throwError(next, "Event not created");
    }
    response.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: newEvent,
    });
  } catch (error) {
    next(error);
  }
};
