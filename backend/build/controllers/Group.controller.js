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
exports.getGroupDetails = exports.getGroupsByOrganizer = exports.createUserGroup = exports.getUserGroups = void 0;
const UserQueries_1 = require("../database/UserQueries");
const Error_1 = require("../utils/Error");
const UploadToS3_1 = require("../utils/UploadToS3");
const GetImageDimention_1 = __importDefault(require("../utils/GetImageDimention"));
const getUserGroups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
        else {
            const userGroups = yield (0, UserQueries_1.getUserGroupsQuery)(userId);
            res.status(200).json(userGroups);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUserGroups = getUserGroups;
const createUserGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { about, name, group_type, location } = req.body;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        const file = req === null || req === void 0 ? void 0 : req.file;
        const imageBuffer = file === null || file === void 0 ? void 0 : file.buffer;
        const groupExists = yield (0, UserQueries_1.checkGroupExists)(name);
        console.log(groupExists, "groupExists");
        if (groupExists.length) {
            return (0, Error_1.throwError)(next, { name: "Group name already exists" });
        }
        if (!imageBuffer) {
            return (0, Error_1.throwError)(next, { image: "Image not provided" });
        }
        const dimensions = yield (0, GetImageDimention_1.default)(imageBuffer);
        if (dimensions.width !== 1920 || dimensions.height !== 1080) {
            return (0, Error_1.throwError)(next, { image: "Image dimensions must be 1920x1080" });
        }
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
        const imageUrl = yield (0, UploadToS3_1.uploadToS3)(name, imageBuffer, file.mimetype);
        const newGroup = yield (0, UserQueries_1.addUserGroup)(name, group_type, location, userId, about, imageUrl);
        // Send response
        res.status(200).json({
            success: true,
            message: "Group created successfully",
            data: newGroup,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUserGroup = createUserGroup;
const getGroupsByOrganizer = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = request === null || request === void 0 ? void 0 : request.user) === null || _c === void 0 ? void 0 : _c.userId;
    if (!userId) {
        return (0, Error_1.throwError)(next, "User not found");
    }
    try {
        const groups = yield (0, UserQueries_1.getGroupsByOrganizedBy)(userId);
        response.status(200).json({
            success: true,
            message: "Groups fetched successfully",
            data: groups,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGroupsByOrganizer = getGroupsByOrganizer;
const getGroupDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const name = (_d = request === null || request === void 0 ? void 0 : request.query) === null || _d === void 0 ? void 0 : _d.name;
        const userId = (_e = request === null || request === void 0 ? void 0 : request.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
        if (!name) {
            return (0, Error_1.throwError)(next, "Group not found");
        }
        const group = yield (0, UserQueries_1.getGroupByName)(name === null || name === void 0 ? void 0 : name.toString());
        const organized_by = yield (0, UserQueries_1.getUserNameById)(group.organized_by);
        const image = yield (0, UploadToS3_1.getImage)(group.image);
        if (!organized_by) {
            return (0, Error_1.throwError)(next, "Organizer not found");
        }
        response.status(200).json({
            success: true,
            message: "Group details fetched successfully",
            data: Object.assign(Object.assign({}, group), { organized_by, image }),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGroupDetails = getGroupDetails;
