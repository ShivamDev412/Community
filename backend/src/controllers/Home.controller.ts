import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import getCity from "../services/GetCity";
import db from "../database/db.config";
import calculateDistance from "../services/CalculateDistance";
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
    const { query, latitude, longitude, radius } = request.query;
    const radiusValue = radius || 30;
    let events = await db.event.findMany();

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

    events = events.filter((event) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        event.latitude as number,
        event.longitude as number
      );
      return distance <= +radiusValue;
    });

    response.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};
