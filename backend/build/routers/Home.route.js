"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Endpoints_1 = require("../utils/Endpoints");
const Home_controller_1 = require("../controllers/Home.controller");
const Auth_middleware_1 = require("../middlewares/Auth.middleware");
const route = express_1.default.Router();
route.get(Endpoints_1.ENDPOINTS.SEARCH, Auth_middleware_1.AuthMiddleware, Home_controller_1.searchByNameAndLocation);
exports.default = route;
