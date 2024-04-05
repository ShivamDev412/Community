import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const isZodError = (error: any): error is ZodError => {
  return error instanceof ZodError;
};

class NotFoundError extends Error {}
class UnauthorizedError extends Error {}
class ForbiddenError extends Error {}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR:", err);

  if (isZodError(err) || (err as any)?.code === "custom") {
    const validationErrors = isZodError(err)
      ? err.errors.map((error) => error.message)
      : [err.message];
    console.error("Validation Errors:", validationErrors);
    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: validationErrors,
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      success: false,
      error: "Resource Not Found",
    });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  } else if (err instanceof ForbiddenError) {
    res.status(403).json({
      success: false,
      error: "Forbidden",
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

export default errorHandler;
