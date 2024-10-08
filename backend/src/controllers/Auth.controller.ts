import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {
  SignupSchema,
  LoginSchema,
  ResetPasswordSchema,
  ForgotPasswordValidation,
} from "../utils/Validation";
// @ts-ignore
import passport from "passport";
import { generateRefreshToken, generateToken } from "../services/GenerateToken";
import { throwError } from "../utils/Error";
import { uploadToS3, uploadCompressedImageToS3 } from "../services/UploadToS3";
import { sendToMail } from "../services/SendEmail";
import jwt from "jsonwebtoken";
import db from "../database/db.config";
import dotenv from "dotenv";
import ForgotPasswordTemplate from "../emailTemplates/ForgotPasswordTemplate";
import { DecodedToken } from "../Types/Auth.type";
import SetCookies, { ClearCookie } from "../services/SetCookies";
import {
  createUser,
  finUserByEmail,
  findUser,
  updateUser,
} from "../prisma/schema/User.schema";
dotenv.config();
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const existingUser = await finUserByEmail(email);

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
      const newRefreshToken = generateRefreshToken({
        id: existingUser.id,
      });
      const newRefreshTokenArray = !cookies["community-refresh-token"]
        ? existingUser.refresh_token
        : existingUser.refresh_token.filter((token) => {
            token !== cookies["community-refresh-token"];
          });
      if (cookies["community-refresh-token"])
        ClearCookie(res, "community-refresh-token");
      await updateUser(existingUser.id, {
        refresh_token: [...newRefreshTokenArray, newRefreshToken],
      });

      SetCookies(res, "community-refresh-token", newRefreshToken);
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          "auth-token": token,
        },
      });
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
    const isUserExists = await finUserByEmail(email);
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
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      image,
      compressed_image: compressedImage,
    });
    if (newUser) {
      const token = generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      const refreshToken = generateRefreshToken({
        id: newUser.id.toString(),
      });
      await updateUser(newUser.id, {
        refresh_token: [refreshToken],
      });
      SetCookies(res, "community-refresh-token", refreshToken);
      res.status(200).json({
        success: true,
        message: "Signup successful",
        data: {
          "auth-token": token,
        },
      });
    } else {
      throwError(next, "Failed to signup");
    }
  } catch (error) {
    next(error);
  }
};
export const HandleRefreshToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const cookies = request.cookies;
  const refreshToken = cookies["community-refresh-token"];
  if (!refreshToken) {
    response.status(401).json({
      success: false,
      message: "Refresh token not provided",
    });
    return;
  }
  const existingUser = await db.user.findFirst({
    where: {
      refresh_token: {
        hasSome: [refreshToken],
      },
    },
  });
  // ClearCookie(response, "community-refresh-token");
  // Detected refresh token reuse
  if (!existingUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (err: any, decode: any) => {
        if (err) {
          response.status(403).json({
            success: false,
            message: "Invalid refresh token",
          });
          // Finding the user whose refresh token is reused
          const hackedUser = await findUser(decode?.id);
          // Deleting all the refresh token of the user
          await updateUser(hackedUser?.id as string, {
            refresh_token: [],
          });
        }
      }
    );
    return response.status(403).json({
      success: false,
      message: "Forbidden. No user found with this refresh token",
    });
  } else {
    const newRefreshTokenArray = existingUser?.refresh_token.filter((token) => {
      return token !== refreshToken;
    });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (err: any, decode: any) => {
        if (err) {

          const result = await updateUser(existingUser.id, {
            refresh_token: [...newRefreshTokenArray],
          });
        }
        if (err || existingUser.id !== decode?.id) {
          return response.status(403).json({
            success: false,
            message: "Invalid refresh token",
          });
        }
        // Refresh token is valid
        const accessToken = generateToken({
          id: existingUser.id,
          email: existingUser.email,
        });
        const newRefreshToken = generateRefreshToken({
          id: existingUser.id,
        });
        const userWithUpdatedRefreshToken = await updateUser(existingUser.id, {
          refresh_token: [...newRefreshTokenArray, newRefreshToken],
        });
        if (userWithUpdatedRefreshToken) {
          SetCookies(response, "community-refresh-token", newRefreshToken);
          response.status(200).json({
            success: true,
            message: "Access token generated successfully",
            "auth-token": accessToken,
          });
        }
      }
    );
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = ForgotPasswordValidation.parse(req.body);
    const user = await finUserByEmail(email);
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
    const user = await finUserByEmail(email);
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
    await updateUser(user.id, {
      password: hashedPassword,
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
export const googleCallback = (req: Request, res: Response) => {
  passport.authenticate("google", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, async () => {
    if (!req.user) {
      res.redirect(process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!);
      return;
    } else {
      const existingUser = req.user;
      const newRefreshToken = generateRefreshToken({
        id: existingUser.id,
      });
      const token = generateToken({
        id: existingUser.id,
        email: existingUser.email,
      });
      const newRefreshTokenArray = !req.cookies["community-refresh-token"]
        ? existingUser.refresh_token
        : existingUser.refresh_token.filter((token: string) => {
            token !== req.cookies["community-refresh-token"];
          });
      if (req.cookies["community-refresh-token"])
        ClearCookie(res, "community-refresh-token");
      await updateUser(existingUser.id, {
        refresh_token: [...newRefreshTokenArray, newRefreshToken],
      });
      SetCookies(res, "community-refresh-token", newRefreshToken);
      res.redirect(
        `${process.env.SOCIAL_LOGIN_SUCCESS_REDIRECT_URL}?token=${token}`
      );
    }
  });
};
export const githubLogin = async (req: Request, res: Response) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res);
};
export const githubCallback = (req: Request, res: Response) => {
  passport.authenticate("github", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, () => {
    const token = generateToken({
      id: req?.user?.id as string,
      email: req?.user?.email,
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
export const facebookCallback = (req: Request, res: Response) => {
  passport.authenticate("facebook", {
    failureRedirect: process.env.SOCIAL_LOGIN_FAILURE_REDIRECT_URL!,
  })(req, res, () => {
    const token = generateToken({
      id: req?.user?.id as string,
      email: req?.user?.email,
    });
    res.cookie("community-auth-token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
    });
    res.redirect(process.env.SOCIAL_LOGIN_SUCCESS_REDIRECT_URL!);
    return;
  });
};
