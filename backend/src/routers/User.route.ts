
import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { GetUserData, } from "../controllers/User.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
const route = express.Router();

route.get(ENDPOINTS.USER, AuthMiddleware, GetUserData);


export default route;
