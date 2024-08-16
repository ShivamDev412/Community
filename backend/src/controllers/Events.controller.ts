import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import {
  getImage,
  uploadCompressedImageToS3,
  uploadToS3,
} from "../services/UploadToS3";
import getImageDimensions from "../services/GetImageDimension";
import { getLatitudeAndLongitude } from "../services/GetLatitudeAndLongitude";
import { NewEventSchema } from "../utils/Validation";
import {
  findInterests,
  findInterestsByIds,
} from "../prisma/schema/Interest.schema";
import {
  addEvent,
  existingEvent,
  findEvent,
  findEventMembers,
  updateEventById,
} from "../prisma/schema/Event.schema";
import { findUser } from "../prisma/schema/User.schema";
import { findGroup } from "../prisma/schema/Group.schema";

export const getTags = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId: string | undefined = request?.user?.id;
  if (!userId) {
    return throwError(next, "User not found");
  }

  try {
    const interests = await findInterests();

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
      address,
      link,
      category,
    } = NewEventSchema.parse(request.body);
    const userId: string | undefined = request?.user?.id;
    const file = request?.file;
    const imageBuffer = file?.buffer;
    const eventExists = await existingEvent({
      name,
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
      const locationToSend = type === "in-person" ? address : null;
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
        const locationCoord = await getLatitudeAndLongitude(address as string);
        if (locationCoord) {
          latitude = locationCoord.latitude;
          longitude = locationCoord.longitude;
        }
      }

      const newEvent = await addEvent({
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
        category_id: category,
      });
      const tagIds = tagsToSend.map((tag: { id: string }) => tag.id);
      const interests = await findInterestsByIds(tagIds);
      await updateEventById(newEvent.id, {
        tags: {
          connect: interests.map((interest) => ({ id: interest.id })),
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
    const userId: string | undefined = req.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const eventId = req.params.eventId;
    const [event, eventMembers] = await Promise.all([
      findEvent(eventId),
      findEventMembers(eventId),
    ]);
    const [eventImage, compressedEventImage, host, group, members] =
      await Promise.all([
        getImage(event?.image || ""),
        getImage(event?.compressed_image || ""),
        findUser(event?.host_id as string, {
          id: true,
          name: true,
          image: true,
          compressed_image: true,
        }),
        findGroup(event?.group_id as string, {
          name: true,
          image: true,
          compressed_image: true,
          location: true,
          group_type: true,
        }),
        Promise.all(
          eventMembers.map(async ({ user }) => {
            return {
              ...user,
              image: user?.image?.includes("https://")
                ? user.image
                : await getImage(user?.image || ""),
              compressed_image: user?.image?.includes("https://")
                ? user.image
                : await getImage(user?.compressed_image || ""),
              id: user?.id,
            };
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
    const membersToSend = members.reduce(
      (accumulator, member) => {
        if (member.id !== host?.id) {
          accumulator.push({
            ...member,
            image: member?.image || null,
            compressed_image: member?.compressed_image || null,
            type: "member",
          });
        }
        return accumulator;
      },
      [
        {
          id: host?.id || "",
          image: hostImage || null,
          compressed_image: hostCompressedImage || null,
          type: "host",
          name: host?.name || "",
        },
      ]
    );
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
      address,
      link,
      image,
    } = NewEventSchema.parse(request.body);
    const userId: string | undefined = request?.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
    const eventId = request.params.eventId;
    const file = request?.file;
    const imageBuffer = file?.buffer;
    const event = await findEvent(eventId);
    if (event?.name !== name) {
      const eventExists = await existingEvent({
        name,
      });
      if (eventExists) {
        return throwError(next, { name: "Event with that name already exists" });
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
    const locationToSend = type === "in-person" ? address : null;
    const tagsToSend = JSON.parse(tags);
    let latitude = 0;
    let longitude = 0;
    if (type === "in-person") {
      const locationCoord = await getLatitudeAndLongitude(address as string);

      if (locationCoord) {
        latitude = locationCoord.latitude;
        longitude = locationCoord.longitude;
      }
    }
    const tagIds = tagsToSend.map((tag: { id: string }) => tag.id);
    const interests = await findInterestsByIds(tagIds);
    const updateEvent = await updateEventById(eventId, {
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
    });
    const updateEventWithTag = await updateEventById(updateEvent.id, {
      tags: {
        set: interests.map((interest) => ({ id: interest.id })),
      },
    });
    if (!updateEventWithTag) {
      return throwError(next, "Event not created");
    }
    response.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updateEventWithTag,
    });
  } catch (error) {
    next(error);
  }
};
