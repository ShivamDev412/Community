import { Request, Response, NextFunction } from "express";
import { throwError } from "../utils/Error";
import { getAllTags } from "../database/UserQueries";

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
    const groups = await getAllTags();
    response.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};
