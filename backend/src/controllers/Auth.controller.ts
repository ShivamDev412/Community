import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {
  SignupSchema,
  LoginSchema,
  ResetPasswordSchema,
} from "../utils/Validation";
// @ts-ignore
import passport from "passport";
import { generateToken } from "../utils/GenerateToken";
// import sql from "../database";
import { throwError } from "../utils/Error";
import {
  uploadToS3,
  getImage,
  uploadCompressedImageToS3,
} from "../utils/UploadToS3";
import { sendToMail } from "../services/SendEmail";
import jwt from "jsonwebtoken";
import db from "../database/db.config";
import dotenv from "dotenv";
import ForgotPasswordTemplate from "../emailTemplates/ForgotPasswordTemplate";
import { DecodedToken } from "../Types/Auth.type";
dotenv.config();
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throwError(next, "No user with that email exists");
      return;
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser?.password || ""
      );
      if (!isPasswordCorrect) {
        throwError(next, "Password is incorrect");
        return;
      }
      const token = generateToken({
        id: existingUser.id.toString(),
        email: existingUser.email,
      });
      res.cookie("community-auth-token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
      });
      const imageUrl = await getImage(existingUser?.image || "");
      const compressedImageUrl = await getImage(
        existingUser.compressed_image || ""
      );
      if (imageUrl) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            userId: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            image: imageUrl,
            compressedImage: compressedImageUrl,
            bio: existingUser.bio,
            location: existingUser.location,
            dob: existingUser.dob,
            sex: existingUser.sex,
            age: existingUser.dob
              ? new Date().getFullYear() -
                new Date(existingUser.dob).getFullYear()
              : 0,
            joined_on: existingUser.joined_on,
            looking_for: existingUser.looking_for,
            life_state: existingUser.life_state,
          },
        });
      } else {
        throwError(next, "Failed to login");
      }
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
    const isUserExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (isUserExists) {
      throwError(next, "User with this email already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const image = await uploadToS3(name, file?.buffer, file.mimetype);
    const compressedImage = await uploadCompressedImageToS3(
      name,
      file?.buffer,
      file.mimetype
    );
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        compressed_image: compressedImage,
      },
    });
    const user = await db.user.findUnique({
      where: {
        id: newUser.id,
      },
    });
    if (user?.id && user?.email) {
      const token = generateToken({
        id: user.id,
        email: user.email,
      });
      res.cookie("community-auth-token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
      });
      const imageUrl = await getImage(user?.image || "");
      const compressedImageUrl = await getImage(user?.compressed_image || "");
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
    } else {
      throwError(next, "Failed to create user");
    }
  } catch (error) {
    next(error);
  }
};
// export const deleteAllUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await sql`DELETE FROM users`;
//     res
//       .status(200)
//       .json({ success: true, message: "All users deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
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
      ForgotPasswordTemplate(token)
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

export const verifyTokenAndSetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword, confirmPassword, token } =
      ResetPasswordSchema.parse(req.body);
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

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
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
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
        id: req.user.id,
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
