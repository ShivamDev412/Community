import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";
import { throwError } from "../utils/Error";
import getCity from "../services/GetCity";
import db from "../database/db.config";
import calculateDistance from "../services/CalculateDistance";
import { getImage } from "../services/UploadToS3";
export const searchByNameAndLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { event, city, state } = request.query;
    const userId: string | undefined = request?.user?.id;
    if (!userId) {
      return throwError(next, "User not found");
    }
  } catch (error) {
    next(error);
  }
};
export const getCityOfUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = request.body;
    if (lat && lon) {
      const address = await getCity(lat, lon);
      const city = address.find((component: any) =>
        component.types.includes("administrative_area_level_3")
      )?.short_name;
      const state = address.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      )?.short_name;
      const location = {
        city,
        state,
      };
      response.status(200).json(location);
    }
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request?.user?.id;
    const { query, latitude, longitude, radius, type } = request.query;
    const radiusValue = radius;
    const today = moment().utc().startOf("day");
    let events = await db.event.findMany({
      where: {
        host_id: {
          not: {
            equals: userId,
          },
        },
        event_date: {
          gte: today.toDate(),
        },
      },
      orderBy: {
        event_date: "asc",
      },
    });
    events = await Promise.all(
      events.map(async (event) => {
        return {
          ...event,
          image: (await getImage(event?.image || "")) as string,
          compressed_image: (await getImage(
            event?.compressed_image || ""
          )) as string,
          group: await db.group.findUnique({
            where: {
              id: event?.group_id,
            },
            select: {
              name: true,
              location: true,
            },
          }),
          members: await db.userEvent.count({
            where: {
              event_id: event?.id,
            },
          }),
        };
      })
    );

    if (typeof query === "string" && query.trim() !== "") {
      const filteredEvents = events.filter((event) => {
        const isQueryInName = event.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const isQueryInDescription = event.details
          ?.toLowerCase()
          .includes(query.toLowerCase());
        return isQueryInName || isQueryInDescription;
      });
      events = filteredEvents;
    }

    if (radiusValue) {
      events = events.filter((event) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          event.latitude as number,
          event.longitude as number
        );
        return distance <= +radiusValue;
      });
    } else if (type === "online") {
      events = events.filter((event) => {
        return event.event_type === type;
      });
    }

    const groupedEvents = events.reduce((acc: any, event) => {
      const eventDate = moment(event.event_date).utc().startOf("day");
      const formattedDate = eventDate.isSame(today, "day")
        ? today.unix()
        : eventDate.unix();
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(event);
      return acc;
    }, {});
    response.status(200).json({
      success: true,
      data: groupedEvents,
    });
  } catch (error) {
    next(error);
  }
};
