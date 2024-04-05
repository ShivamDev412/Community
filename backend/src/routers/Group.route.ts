import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import multer from "multer";
import {
  createUserGroup,
  getAllEventsInGroup,
  getGroupDetails,
  getGroupsByOrganizer,
  getUserGroups,
  updateUserGroup,
} from "../controllers/Group.controller";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.get(ENDPOINTS.GROUPS, AuthMiddleware, getUserGroups);
route.post(ENDPOINTS.CREATE_GROUP, AuthMiddleware, upload, createUserGroup);
route.get(
  ENDPOINTS.GROUPS_ORGANIZED_BY_USER,
  AuthMiddleware,
  getGroupsByOrganizer
);
route.get(ENDPOINTS.GROUP_DETAILS, AuthMiddleware, getGroupDetails);
route.get(ENDPOINTS.GET_EVENTS_IN_GROUP, AuthMiddleware, getAllEventsInGroup);
route.put(ENDPOINTS.UPDATE_GROUP, AuthMiddleware, upload, updateUserGroup);
export default route;
