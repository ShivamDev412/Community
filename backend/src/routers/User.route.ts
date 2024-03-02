import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import {
  GetUserData,
  GetUserGroups,
  createUserGroup,
  getGroupsByOrganizer,
} from "../controllers/User.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image'); 
route.get(ENDPOINTS.USER, AuthMiddleware, GetUserData);
route.get(ENDPOINTS.GROUPS, AuthMiddleware, GetUserGroups);
route.post(ENDPOINTS.CREATE_GROUP, AuthMiddleware, upload, createUserGroup);
route.get(ENDPOINTS.GROUPS_ORGANIZED_BY_USER, AuthMiddleware, getGroupsByOrganizer)
export default route;
