"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteMiddleware = void 0;
const app_1 = __importDefault(require("../app"));
const Endpoints_1 = require("../utils/Endpoints");
const Auth_route_1 = __importDefault(require("../routers/Auth.route"));
const User_route_1 = __importDefault(require("../routers/User.route"));
const Event_route_1 = __importDefault(require("../routers/Event.route"));
const Group_route_1 = __importDefault(require("../routers/Group.route"));
const Home_route_1 = __importDefault(require("../routers/Home.route"));
const RouteMiddleware = () => {
    app_1.default.use(Endpoints_1.API_ENDPOINTS.AUTH, Auth_route_1.default);
    app_1.default.use(Endpoints_1.API_ENDPOINTS.USER, User_route_1.default);
    app_1.default.use(Endpoints_1.API_ENDPOINTS.EVENT, Event_route_1.default);
    app_1.default.use(Endpoints_1.API_ENDPOINTS.GROUP, Group_route_1.default);
    app_1.default.use(Endpoints_1.API_ENDPOINTS.HOME, Home_route_1.default);
};
exports.RouteMiddleware = RouteMiddleware;
