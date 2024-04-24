import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { getCityOfUser, searchByNameAndLocation } from "../controllers/Home.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

const route = express.Router();
route.get(ENDPOINTS.SEARCH, AuthMiddleware, searchByNameAndLocation);
route.post(ENDPOINTS.GET_CITY, AuthMiddleware, getCityOfUser);
export default route;