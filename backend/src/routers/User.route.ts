import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import {
  GetUserData,
  changePassword,
  editUserProfile,
  updateUserPersonalInfo,
} from "../controllers/User.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.get(ENDPOINTS.USER, AuthMiddleware, GetUserData);
route.post(ENDPOINTS.EDIT_PROFILE, AuthMiddleware, upload, editUserProfile);
route.put(
  ENDPOINTS.UPDATE_PERSONAL_INFO,
  AuthMiddleware,
  updateUserPersonalInfo
);
route.put(ENDPOINTS.CHANGE_PASSWORD, AuthMiddleware, changePassword);

export default route;
