import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import {
  GetUserData,
  LogOut,
  addUserInterests,
  changePassword,
  editUserProfile,
  getAllCategories,
  getInterestsByCategories,
  getUserAllInterests,
  getUserCreatedGroups,
  getUserEvents,
  removeUserInterests,
  updateUserPersonalInfo,
  registerToEvent,
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
route.get(ENDPOINTS.CATEGORIES, AuthMiddleware, getAllCategories);
route.get(ENDPOINTS.INTERESTS, AuthMiddleware, getInterestsByCategories);
route.post(ENDPOINTS.ADD_INTERESTS, AuthMiddleware, addUserInterests);
route.delete(ENDPOINTS.DELETE_INTERESTS, AuthMiddleware, removeUserInterests);
route.get(ENDPOINTS.GET_USER_INTERESTS, AuthMiddleware, getUserAllInterests);
route.get(
  ENDPOINTS.GET_USER_GROUPS_ORGANIZER,
  AuthMiddleware,
  getUserCreatedGroups
);
route.get(ENDPOINTS.USER_EVENTS, AuthMiddleware, getUserEvents);
route.post(ENDPOINTS.LOGOUT, AuthMiddleware, LogOut);
route.post(ENDPOINTS.REGISTER_TO_EVENT, AuthMiddleware, registerToEvent);

export default route;
