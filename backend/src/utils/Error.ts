import { NextFunction } from "express";

export const throwError = (next: NextFunction, message: string | object) => {
    next({
      message,
    });
  };
  