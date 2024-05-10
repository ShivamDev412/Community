import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { GetCityOfUser, SearchByNameAndLocation, GetEvents, GetAttendingEvents, HandleSearch } from "../controllers/Home.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

const route = express.Router();
route.get(ENDPOINTS.SEARCH, AuthMiddleware, SearchByNameAndLocation);
route.post(ENDPOINTS.GET_CITY, AuthMiddleware, GetCityOfUser);
route.get(ENDPOINTS.GET_EVENTS, AuthMiddleware, GetEvents);
route.get(ENDPOINTS.RSVP_EVENTS, AuthMiddleware, GetAttendingEvents);
route.get(ENDPOINTS.SEARCH_EVENTS, AuthMiddleware, HandleSearch);
export default route;