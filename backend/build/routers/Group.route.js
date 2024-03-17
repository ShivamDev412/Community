"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Endpoints_1 = require("../utils/Endpoints");
const Auth_middleware_1 = require("../middlewares/Auth.middleware");
const multer_1 = __importDefault(require("multer"));
const Group_controller_1 = require("../controllers/Group.controller");
const route = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage }).single("image");
route.get(Endpoints_1.ENDPOINTS.GROUPS, Auth_middleware_1.AuthMiddleware, Group_controller_1.getUserGroups);
route.post(Endpoints_1.ENDPOINTS.CREATE_GROUP, Auth_middleware_1.AuthMiddleware, upload, Group_controller_1.createUserGroup);
route.get(Endpoints_1.ENDPOINTS.GROUPS_ORGANIZED_BY_USER, Auth_middleware_1.AuthMiddleware, Group_controller_1.getGroupsByOrganizer);
route.get(Endpoints_1.ENDPOINTS.GROUP_DETAILS, Auth_middleware_1.AuthMiddleware, Group_controller_1.getGroupDetails);
exports.default = route;
