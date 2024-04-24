import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app";
import dotenv from "dotenv";
// @ts-ignore
import passport from "passport";
import { RouteMiddleware } from "./middlewares/Route.middleware";
import errorHandler from "./middlewares/ErrorHandler.middleware";
import {
  GoogleMiddleware,
  GithubMiddleware,
  FacebookMiddleware,
} from "./middlewares/Passport.middleware";
import session from "express-session";
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
dotenv.config();

const PORT = process.env.NODE_PORT || 4000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: "google-auth-session",
    secret: ["key1", "key2"],
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
GoogleMiddleware();
GithubMiddleware();
FacebookMiddleware();
RouteMiddleware();
app.use(errorHandler);
app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
