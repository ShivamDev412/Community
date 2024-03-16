"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.Signup = exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Validation_1 = require("../utils/Validation");
const UserQueries_1 = require("../database/UserQueries");
const GenerateToken_1 = require("../utils/GenerateToken");
const database_1 = __importDefault(require("../database"));
const Error_1 = require("../utils/Error");
const UploadToS3_1 = require("../utils/UploadToS3");
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = Validation_1.LoginSchema.parse(req.body);
        const existingUser = yield (0, UserQueries_1.getUserByEmail)(email);
        if (!existingUser) {
            (0, Error_1.throwError)(next, "No user with that email exists");
            return;
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            (0, Error_1.throwError)(next, "Password is incorrect");
            return;
        }
        const token = (0, GenerateToken_1.generateToken)({
            id: existingUser.user_id.toString(),
            email: existingUser.email,
        });
        res.cookie("community-auth-token", token, {
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
        });
        const imageUrl = yield (0, UploadToS3_1.getImage)(existingUser === null || existingUser === void 0 ? void 0 : existingUser.image);
        if (imageUrl) {
            console.log(existingUser);
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    userId: existingUser.user_id,
                    email: existingUser.email,
                    name: existingUser.name,
                    image: imageUrl,
                    bio: existingUser.bio,
                    location: existingUser.location,
                    dob: existingUser.dob,
                    sex: existingUser.sex,
                    age: existingUser.age,
                    joined_on: existingUser.joined_on,
                    looking_for: existingUser.looking_for,
                    life_state: existingUser.life_state,
                },
            });
        }
        else {
            (0, Error_1.throwError)(next, "Failed to login");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.Login = Login;
const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = Validation_1.SignupSchema.parse(req.body);
        const file = req.file;
        if (!file) {
            return (0, Error_1.throwError)(next, "Profile Image not provided");
        }
        const isUserExists = yield (0, UserQueries_1.getUserByEmail)(email);
        if (isUserExists) {
            (0, Error_1.throwError)(next, "User with this email already exists");
            return;
        }
        const image = yield (0, UploadToS3_1.uploadToS3)(name, file === null || file === void 0 ? void 0 : file.buffer, file.mimetype);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUserRow = yield (0, UserQueries_1.addNewUser)(name, email, hashedPassword, image);
        if (!newUserRow) {
            (0, Error_1.throwError)(next, "Failed to create user");
            return;
        }
        const user = yield (0, UserQueries_1.getUserById)(newUserRow.user_id);
        const token = (0, GenerateToken_1.generateToken)({
            id: newUserRow.user_id,
            email: newUserRow.email,
        });
        res.cookie("community-auth-token", token, {
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
        });
        const imageUrl = yield (0, UploadToS3_1.getImage)(user === null || user === void 0 ? void 0 : user.image);
        if (imageUrl) {
            res.status(200).json({
                success: true,
                message: "Signup successful",
                data: Object.assign(Object.assign({}, user), { image: imageUrl }),
            });
        }
        else {
            (0, Error_1.throwError)(next, "Failed to create user");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.Signup = Signup;
const deleteAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default) `DELETE FROM users`;
        res
            .status(200)
            .json({ success: true, message: "All users deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAllUsers = deleteAllUsers;
