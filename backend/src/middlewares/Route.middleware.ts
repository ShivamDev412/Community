import app from "../app";
import { API_ENDPOINTS } from "../utils/Endpoints";
import AuthRoute from "../routers/Auth.route";
import UserRoute from "../routers/User.route";
export const RouteMiddleware = () => {
  app.use(API_ENDPOINTS.AUTH, AuthRoute);
  app.use(API_ENDPOINTS.USER, UserRoute);
};
