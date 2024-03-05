import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import { Login, Signup, deleteAllUsers } from "../controllers/Auth.controller";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.post(ENDPOINTS.LOGIN, Login);
route.post(ENDPOINTS.SIGNUP, upload, Signup);
route.delete("/delete", deleteAllUsers)
export default route;
