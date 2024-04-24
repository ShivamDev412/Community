import jwt from "jsonwebtoken";
import { TokenData } from "../Types/Auth.type";

export const generateToken = (data: TokenData) => {
  const token = jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: "30m" }
  );
  return token;
};
export const generateRefreshToken = (data: TokenData) => {
  const token = jwt.sign(
    { id: data.id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "10d" }
  );
  return token;
};