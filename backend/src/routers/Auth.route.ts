import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { Login, Signup, deleteAllUsers } from "../controllers/Auth.controller";
const route = express.Router();

route.post(ENDPOINTS.LOGIN, Login);
route.post(ENDPOINTS.SIGNUP, Signup);
route.delete("/delete", deleteAllUsers)
export default route;
