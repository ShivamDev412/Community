import { NextFunction } from "express";

export const throwError = (next: NextFunction, message: string) => {
    next({
      message,
    });
  };
  