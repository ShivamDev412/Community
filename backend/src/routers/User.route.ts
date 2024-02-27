import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { GetUserData, GetUserGroups } from "../controllers/User.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
const route = express.Router();

route.get(ENDPOINTS.USER,AuthMiddleware, GetUserData)
route.get(ENDPOINTS.GROUPS, AuthMiddleware, GetUserGroups)
export default route;