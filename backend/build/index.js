"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const Route_middleware_1 = require("./middlewares/Route.middleware");
const ErrorHandler_middleware_1 = __importDefault(require("./middlewares/ErrorHandler.middleware"));
dotenv_1.default.config();
const PORT = process.env.NODE_PORT || 4000;
app_1.default.use((0, cors_1.default)());
app_1.default.use(express_1.default.json());
app_1.default.use(express_1.default.urlencoded({ extended: false }));
app_1.default.use((0, cookie_parser_1.default)());
(0, Route_middleware_1.RouteMiddleware)();
app_1.default.use(ErrorHandler_middleware_1.default);
app_1.default.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});
