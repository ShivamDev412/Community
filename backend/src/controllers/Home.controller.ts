import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
export const searchByNameAndLocation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { event, city, state } = request.query;
    const userId: string | undefined = request?.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    }
    
  } catch (error) {
    next(error);
  }
};
