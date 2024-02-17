import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const isZodError = (error: any): error is ZodError => {
  return error instanceof ZodError;
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "ERROR")
  if (isZodError(err) || (err as any)?.code === "custom") {
    const validationErrors = isZodError(err) ? err.errors.map((error) => error.message) : [err.message];
    console.error("Validation Errors:", validationErrors);
    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: validationErrors,
    });
  } else {
    console.error("Internal Server Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export default errorHandler;
