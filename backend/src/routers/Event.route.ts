import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { getTags, createEvent,   getEventDetails, updateEvent, } from "../controllers/Events.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.get(ENDPOINTS.TAGS, AuthMiddleware, getTags);
route.post(ENDPOINTS.CREATE_EVENT, AuthMiddleware, upload, createEvent);
route.get(ENDPOINTS.EVENTS_DETAILS, AuthMiddleware, getEventDetails);
route.put(ENDPOINTS.UPDATE_EVENT, AuthMiddleware, upload, updateEvent);
export default route;
