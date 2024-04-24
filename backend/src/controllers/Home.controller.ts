import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import getCity from "../services/GetCity";
import db from "../database/db.config";
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
    const userId = request?.user?.id;
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
      console.log(location);
      response.status(200).json(location);
      // await db.user.update({
      //   where: {
      //     id: userId
      //   },
      //   data: {
      //     location: coord
      //   }
      // })
    }
  } catch (error) {
    next(error);
  }
};
