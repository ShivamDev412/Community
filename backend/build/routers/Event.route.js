"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Endpoints_1 = require("../utils/Endpoints");
const Events_controller_1 = require("../controllers/Events.controller");
const Auth_middleware_1 = require("../middlewares/Auth.middleware");
const multer_1 = __importDefault(require("multer"));
const route = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage }).single("image");
route.get(Endpoints_1.ENDPOINTS.TAGS, Auth_middleware_1.AuthMiddleware, Events_controller_1.getTags);
route.post(Endpoints_1.ENDPOINTS.CREATE_EVENT, Auth_middleware_1.AuthMiddleware, upload, Events_controller_1.createEvent);
exports.default = route;
