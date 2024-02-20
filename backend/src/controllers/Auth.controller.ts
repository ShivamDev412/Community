import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { SignupSchema, LoginSchema } from "../utils/Validation";
import { getUserByEmail, addNewUser } from "../database/UserQueries";
import { generateToken } from "../utils/GenerateToken";
import { QueryResultRow } from "pg";
import sql from "../database";

const throwError = (next: NextFunction, message: string) => {
  next({
    message,
  });
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const existingUser: QueryResultRow | null = await getUserByEmail(email);
    if (!existingUser) {
      throwError(next, "No user with that email exists");
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throwError(next, "Password is incorrect");
      return;
    }
    const token = generateToken({
      id: existingUser.user_id.toString(),
      email: existingUser.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = SignupSchema.parse(req.body);
    const isUserExists: QueryResultRow | null = await getUserByEmail(email);
    if (isUserExists) {
      throwError(next, "User with this email already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserRow: QueryResultRow | null = await addNewUser(
      name,
      email,
      hashedPassword
    );

    if (!newUserRow) {
      throwError(next, "Failed to create user");
      return;
    }

    const token = generateToken({
      id: newUserRow.user_id,
      email: newUserRow.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    res.status(200).json({
      success: true,
      message: "Signup successful",
      data: newUserRow,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await sql`DELETE FROM users`;
    res
      .status(200)
      .json({ success: true, message: "All users deleted successfully" });
  } catch (error) {
    next(error);
  }
};
