"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign({ userId: data.id, email: data.email }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    return token;
};
exports.generateToken = generateToken;
