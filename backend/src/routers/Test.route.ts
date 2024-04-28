import express from "express";
import { DeleteUser, GetAllUsers } from "../controllers/Test.controller";
const route = express.Router();
route.get("/user", GetAllUsers);
route.delete("/user", DeleteUser);
export default route;