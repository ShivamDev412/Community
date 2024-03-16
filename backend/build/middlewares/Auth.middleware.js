"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../utils/Error");
const AuthMiddleware = (request, response, next) => {
    const token = request.cookies["community-auth-token"];
    if (!token)
        return (0, Error_1.throwError)(next, "No token provided");
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err)
            return (0, Error_1.throwError)(next, "Invalid token");
        request.user = decoded;
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
