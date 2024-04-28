import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../Types/Auth.type";
import { User } from "../Types";
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
      // @ts-ignore
      file?: File | undefined | null;
    }
  }
}

export const AuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader =
    request.headers.authorization || request.headers.Authorization;
  if (!authHeader?.includes("Bearer ")) {
    response.status(401).json({ message: "Invalid authorization header" });
    return;
  }
  const token = authHeader?.toString().split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decode) => {
    if (err) {
      response.status(403).json({ message: "Invalid token" });
    } else {
      request.user = decode as AuthPayload;
    }
    next();
  });
};
