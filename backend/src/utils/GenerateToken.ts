import jwt from "jsonwebtoken";
import { TokenData } from "../Types/Auth.type";

export const generateToken = (data: TokenData) => {
  const token = jwt.sign(
    { userId: data.id, email: data.email },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: "30d" }
  );
  return token;
};
