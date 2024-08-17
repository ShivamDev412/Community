import { JwtPayload } from "jsonwebtoken";
import {User} from "./index";
export type TokenData = {
  id: string;
  email?: string;
}
export interface AuthPayload extends User{
  token: string;
  id: string;
}
export interface DecodedToken extends JwtPayload {
  id?: string;
  email: string;
  iat: number;
  exp: number;
}