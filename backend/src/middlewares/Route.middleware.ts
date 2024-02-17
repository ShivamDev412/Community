import app from "../app";
import { API_ENDPOINTS } from "../utils/Endpoints";
import AuthRoute from "../routers/Auth.route";
export const RouteMiddleware = () => {
  app.use(API_ENDPOINTS.AUTH, AuthRoute);
};
