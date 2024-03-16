"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Endpoints_1 = require("../utils/Endpoints");
const Auth_controller_1 = require("../controllers/Auth.controller");
const multer_1 = __importDefault(require("multer"));
const route = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage }).single("image");
route.post(Endpoints_1.ENDPOINTS.LOGIN, Auth_controller_1.Login);
route.post(Endpoints_1.ENDPOINTS.SIGNUP, upload, Auth_controller_1.Signup);
route.delete("/delete", Auth_controller_1.deleteAllUsers);
exports.default = route;
