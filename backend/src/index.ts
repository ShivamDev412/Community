import express from "express";
import cors from "cors";
import app from "./app";
import dotenv from "dotenv";
import { RouteMiddleware } from "./middlewares/Route.middleware";
import errorHandler from "./middlewares/ErrorHandler";
dotenv.config();

const PORT = process.env.NODE_PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


RouteMiddleware();
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
