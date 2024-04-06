import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { throwError } from "../utils/Error";
import { AuthPayload } from "../Types/Auth.type";
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
  const token = request.cookies["community-auth-token"];
  if (!token) throwError(next, "No token found");
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY! as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) throwError(next, "Invalid token");
      request.user = decoded;
      next();
    }
  );
};
