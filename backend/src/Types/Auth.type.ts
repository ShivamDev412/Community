import { JwtPayload } from "jsonwebtoken";

export type TokenData = {
  id: string;
  email?: string;
}
export type AuthPayload = {
  token: string;
  id: string;
}
export interface DecodedToken extends JwtPayload {
  id?: string;
  email: string;
  iat: number;
  exp: number;
}