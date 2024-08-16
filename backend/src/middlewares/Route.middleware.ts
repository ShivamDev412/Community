import app from "../app";
import { API_ENDPOINTS } from "../utils/Endpoints";
import AuthRoute from "../routers/Auth.route";
import UserRoute from "../routers/User.route";
import EventRoute from "../routers/Event.route";
import GroupRoute from "../routers/Group.route";
import HomeRoute from "../routers/Home.route";
export const RouteMiddleware = () => {
  app.use(API_ENDPOINTS.AUTH, AuthRoute);
  app.use(API_ENDPOINTS.USER, UserRoute);
  app.use(API_ENDPOINTS.EVENT, EventRoute);
  app.use(API_ENDPOINTS.GROUP, GroupRoute);
  app.use(API_ENDPOINTS.HOME, HomeRoute);
};
