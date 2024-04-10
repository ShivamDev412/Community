import { JwtPayload } from "jsonwebtoken";

export type TokenData = {
  id: string;
  email: string;
}
export type AuthPayload = {
  token: string;
  userId: string;
}
export interface DecodedToken extends JwtPayload {
  email: string;
  iat: number;
  exp: number;
}