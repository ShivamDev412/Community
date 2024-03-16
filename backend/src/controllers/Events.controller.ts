import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import { addEvent, getAllInterests } from "../database/UserQueries";
import { uploadToS3 } from "../utils/UploadToS3";

import { promisify } from "util";

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
    const interests = await getAllInterests();

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
    const { name, details, date, time, type, tags, group, location, link } =
      request.body;
    const userId: string | undefined = request?.user?.userId;
    const file = request?.file;
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
      const newEvent = await addEvent(
        name,
        imageUrl,
        details,
        userId,
        group,
        date,
        time,
        type,
        linkToSend,
        locationToSend,
        tagsToSend
      );
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
