import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app";
import dotenv from "dotenv";
import { RouteMiddleware } from "./middlewares/Route.middleware";
import errorHandler from "./middlewares/ErrorHandler.middleware";
dotenv.config();

const PORT = process.env.NODE_PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


RouteMiddleware();
app.use(errorHandler)
app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
