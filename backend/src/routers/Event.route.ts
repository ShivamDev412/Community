import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { getTags } from "../controllers/Events.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.get(ENDPOINTS.TAGS, AuthMiddleware, getTags);

export default route;
