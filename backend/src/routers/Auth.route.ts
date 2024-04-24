import express from "express";
import { ENDPOINTS } from "../utils/Endpoints";
import {
  Login,
  Signup,
  HandleRefreshToken,
  // deleteAllUsers,
  // facebookCallback,
  // facebookLogin,
  forgotPassword,
  // githubCallback,
  // githubLogin,
  googleCallback,
  googleLogin,
  verifyTokenAndSetPassword,
} from "../controllers/Auth.controller";
import multer from "multer";
const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");
route.post(ENDPOINTS.LOGIN, Login);
route.post(ENDPOINTS.SIGNUP, upload, Signup);
route.get(ENDPOINTS.REFRESH_TOKEN, HandleRefreshToken);
// route.delete("/delete", deleteAllUsers);
route.post(ENDPOINTS.FORGOT_PASSWORD, forgotPassword);
route.post(ENDPOINTS.RESET_PASSWORD, verifyTokenAndSetPassword)
route.get(ENDPOINTS.GOOGLE_LOGIN, googleLogin)
route.get(ENDPOINTS.GOOGLE_CALLBACK, googleCallback)
// route.get(ENDPOINTS.GITHUB_LOGIN,githubLogin);
// route.get(ENDPOINTS.GITHUB_CALLBACK, githubCallback);
// route.get(ENDPOINTS.FACEBOOK_LOGIN,facebookLogin);
// route.get(ENDPOINTS.FACEBOOK_CALLBACK, facebookCallback);

export default route;
