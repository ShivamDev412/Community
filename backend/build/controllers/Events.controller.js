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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.getTags = void 0;
const Error_1 = require("../utils/Error");
const UserQueries_1 = require("../database/UserQueries");
const UploadToS3_1 = require("../utils/UploadToS3");
const getTags = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, Error_1.throwError)(next, "User not found");
    }
    try {
        const interests = yield (0, UserQueries_1.getAllInterests)();
        response.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            data: interests,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTags = getTags;
const createEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { name, details, date, time, type, tags, group, location, link } = request.body;
        const userId = (_b = request === null || request === void 0 ? void 0 : request.user) === null || _b === void 0 ? void 0 : _b.userId;
        const file = request === null || request === void 0 ? void 0 : request.file;
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
        else {
            if (!file) {
                return (0, Error_1.throwError)(next, "Image not provided");
            }
            const linkToSend = type === "online" ? link : null;
            const locationToSend = type === "in-person" ? location : null;
            const tagsToSend = JSON.parse(tags);
            const imageUrl = yield (0, UploadToS3_1.uploadToS3)(name, file === null || file === void 0 ? void 0 : file.buffer, file.mimetype);
            const newEvent = yield (0, UserQueries_1.addEvent)(name, imageUrl, details, userId, group, date, time, type, linkToSend, locationToSend, tagsToSend);
            if (!newEvent) {
                return (0, Error_1.throwError)(next, "Event not created");
            }
            response.status(200).json({
                success: true,
                message: "Event created successfully",
                data: newEvent,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createEvent = createEvent;
