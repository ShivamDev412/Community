import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {
  SignupSchema,
  LoginSchema,
  ResetPasswordSchema,
} from "../utils/Validation";
import {
  getUserByEmail,
  addNewUser,
  getUserById,
  storeToken,
  getToken,
  updateUserPassword,
} from "../database/UserQueries";
// @ts-ignore
import passport from "passport";
import { generateToken } from "../utils/GenerateToken";
import { QueryResultRow } from "pg";
import sql from "../database";
import { throwError } from "../utils/Error";
import {
  uploadToS3,
  getImage,
  uploadCompressedImageToS3,
} from "../utils/UploadToS3";
import GenerateOTP from "../utils/GenerateOTP";
import { sendToMail } from "../utils/SendEmail";
import jwt, { JwtPayload } from "jsonwebtoken";
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
    const imageUrl = await getImage(existingUser?.image);
    const compressedImageUrl = await getImage(existingUser.compressed_image);
    if (imageUrl) {
   
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          userId: existingUser.user_id,
          email: existingUser.email,
          name: existingUser.name,
          image: imageUrl,
          compressedImage: compressedImageUrl,
          bio: existingUser.bio,
          location: existingUser.location,
          dob: existingUser.dob,
          sex: existingUser.sex,
          age: existingUser.age,
          joined_on: existingUser.joined_on,
          looking_for: existingUser.looking_for,
          life_state: existingUser.life_state,
        },
      });
    } else {
      throwError(next, "Failed to login");
    }
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
    const file = req.file;
    if (!file) {
      return throwError(next, "Profile Image not provided");
    }
    const isUserExists: QueryResultRow | null = await getUserByEmail(email);
    if (isUserExists) {
      throwError(next, "User with this email already exists");
      return;
    }
    const image = await uploadToS3(name, file?.buffer, file.mimetype);
    const compressedImage = await uploadCompressedImageToS3(
      name,
      file?.buffer,
      file.mimetype
    );
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserRow: QueryResultRow | null = await addNewUser(
      name,
      email,
      hashedPassword,
      image,
      compressedImage
    );

    if (!newUserRow) {
      throwError(next, "Failed to create user");
      return;
    }
    const user = await getUserById(newUserRow.user_id);
    const token = generateToken({
      id: newUserRow.user_id,
      email: newUserRow.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    const imageUrl = await getImage(user?.image);
    const compressedImageUrl = await getImage(user?.compressed_image);
    if (imageUrl) {
      res.status(200).json({
        success: true,
        message: "Signup successful",
        data: {
          ...user,
          image: imageUrl,
          compressedImage: compressedImageUrl,
        },
      });
    } else {
      throwError(next, "Failed to create user");
    }
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
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      throwError(next, "No user with that email exists");
      return;
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "10m",
    });

    const info = await sendToMail(
      email,
      "Password Reset Request",
      `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="margin-bottom: 20px;">You've requested to reset your password. Click the link below to proceed:</p>
            <p style="margin-bottom: 20px;"><a href="http://localhost:5173/reset-password?token=${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></p>
            <p style="margin-bottom: 20px;">This link will expire in <strong>10 minutes</strong>.</p>
            <p style="margin-bottom: 20px;">If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      `
    );
    if (info)
      res.status(200).json({
        success: true,
        message: "Password reset link sent successfully",
      });
  } catch (error) {
    next(error);
  }
};

interface DecodedToken extends JwtPayload {
  email: string;
  iat: number;
  exp: number;
}

export const verifyTokenAndSetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword, confirmPassword, token } =
      ResetPasswordSchema.parse(req.body);
    const user = await getUserByEmail(email);

    if (!user) {
      throwError(next, "No user with that email exists");
      return;
    }

    try {
      const decoded: DecodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!
      ) as DecodedToken;
      if (decoded.email !== email) {
        throwError(next, "Invalid token");
        return;
      }
      const tokenExpiration = new Date(decoded.exp * 1000);
      const now = new Date();
      if (now >= tokenExpiration) {
        throwError(next, "Token has expired");
        return;
      }
    } catch (error) {
      throwError(next, "Invalid token");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.user_id, hashedPassword);

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
export const googleLogin = async (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};
export const googleCallback = (req: any, res: any) => {
  passport.authenticate("google", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, () => {
    if (!req.user) {
      res.redirect(process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!);
      return;
    } else {
      const token = generateToken({
        id: req.user.user_id,
        email: req.user.email,
      });
      res.cookie("community-auth-token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
      });
      res.redirect(process.env.SOCIAL_LOGIN_SUCCESS_REDIRECT_URL!);
    }

    return;
  });
};
export const githubLogin = async (req: Request, res: Response) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res);
};
export const githubCallback = (req: any, res: any) => {
  passport.authenticate("github", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, () => {
    const token = generateToken({
      id: req.user.user_id,
      email: req.user.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    res.redirect(process.env.SOCIAL_LOGIN_SUCCESS_REDIRECT_URL!);
    return;
  });
};
export const facebookLogin = async (req: Request, res: Response) => {
  passport.authenticate("facebook", { scope: ["email"] })(req, res);
};
export const facebookCallback = (req: any, res: any) => {
  passport.authenticate("facebook", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, () => {
    const token = generateToken({
      id: req.user.user_id,
      email: req.user.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    res.redirect(process.env.SOCIAL_LOGIN_SUCCESS_REDIRECT_URL!);
    return;
  });
};
