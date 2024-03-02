import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { getTags, createEvent } from "../controllers/Events.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.get(ENDPOINTS.TAGS, AuthMiddleware, getTags);
route.post(ENDPOINTS.CREATE_EVENT, AuthMiddleware, upload, createEvent);

export default route;
