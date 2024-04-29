import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { getCityOfUser, searchByNameAndLocation, getEvents } from "../controllers/Home.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

const route = express.Router();
route.get(ENDPOINTS.SEARCH, AuthMiddleware, searchByNameAndLocation);
route.post(ENDPOINTS.GET_CITY, AuthMiddleware, getCityOfUser);
route.get(ENDPOINTS.GET_EVENTS, AuthMiddleware, getEvents);
export default route;