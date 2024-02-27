import { Request, Response, NextFunction } from "express";
import { getUserById, getUserGroups } from "../database/UserQueries";
import { throwError } from "../utils/Error";

export const GetUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (userId) {
      const user = await getUserById(userId);

      res.status(200).json(user);
    } else {
      return throwError(next, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const GetUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string | undefined = req?.user?.userId;
    if (!userId) {
      return throwError(next, "User not found");
    } else {
      const userGroups = await getUserGroups(userId);

      res.status(200).json(userGroups);
    }
  } catch (error) {
    next(error);
  }
};
