import express from "express";
import { DeleteUser, GetAllUsers, GetEvents, RemoveRefreshToken } from "../controllers/Test.controller";
const route = express.Router();
route.get("/user", GetAllUsers);
route.delete("/user", DeleteUser);
route.put("/user", RemoveRefreshToken);
route.get("/events", GetEvents);
export default route;