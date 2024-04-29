import express from "express";
import { DeleteUser, GetAllUsers, GetEvents } from "../controllers/Test.controller";
const route = express.Router();
route.get("/user", GetAllUsers);
route.delete("/user", DeleteUser);
route.get("/events", GetEvents);
export default route;