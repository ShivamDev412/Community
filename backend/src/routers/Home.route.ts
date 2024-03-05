import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { searchByNameAndLocation } from "../controllers/Home.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

const route = express.Router();
route.get(ENDPOINTS.SEARCH, AuthMiddleware, searchByNameAndLocation);
export default route;