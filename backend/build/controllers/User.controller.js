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
exports.getUserCreatedGroups = exports.getUserAllInterests = exports.removeUserInterests = exports.addUserInterests = exports.getInterestsByCategories = exports.getAllCategories = exports.changePassword = exports.updateUserPersonalInfo = exports.editUserProfile = exports.GetUserData = void 0;
const UploadToS3_1 = require("./../utils/UploadToS3");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserQueries_1 = require("../database/UserQueries");
const Error_1 = require("../utils/Error");
const Validation_1 = require("../utils/Validation");
const UploadToS3_2 = require("../utils/UploadToS3");
const moment_1 = __importDefault(require("moment"));
const GetUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            const user = yield (0, UserQueries_1.getUserById)(userId);
            res.status(200).json(user);
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.GetUserData = GetUserData;
const editUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name, address, bio, image } = Validation_1.EditProfileSchema.parse(req.body);
    const file = req.file;
    try {
        const imageToSend = file
            ? yield (0, UploadToS3_2.uploadToS3)(name, file === null || file === void 0 ? void 0 : file.buffer, file.mimetype)
            : image;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (userId) {
            const bioToSend = bio ? bio : "";
            if (imageToSend) {
                yield (0, UserQueries_1.updateUserProfileById)(userId, name, imageToSend, JSON.parse(bioToSend), address ? address : "");
                const updatedUser = yield (0, UserQueries_1.getUserById)(userId);
                const imageData = file ? yield (0, UploadToS3_1.getImage)(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.image) : image;
                if (imageData) {
                    res.status(201).json({
                        success: true,
                        data: Object.assign(Object.assign({}, updatedUser), { image: imageData }),
                        message: "Profiled updated successfully",
                    });
                }
                else {
                    return (0, Error_1.throwError)(next, "Something went wrong while uploading image");
                }
            }
            else {
                return (0, Error_1.throwError)(next, "Something went wrong while uploading image");
            }
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.editUserProfile = editUserProfile;
const updateUserPersonalInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const parsedData = Validation_1.PersonalInfoSchema.safeParse(req.body);
        if (parsedData.success) {
            const { birthday, gender, lookingFor, lifeStages } = parsedData.data;
            let formattedBirthday = null;
            if (birthday) {
                formattedBirthday = (0, moment_1.default)(birthday, "YYYY-MM-DD").format("YYYY-MM-DD");
            }
            const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
            if (userId) {
                yield (0, UserQueries_1.updateUserProfileInfo)(userId, formattedBirthday, gender, lookingFor, lifeStages);
                const updatedUser = yield (0, UserQueries_1.getUserById)(userId);
                res.status(200).json({
                    success: true,
                    data: Object.assign(Object.assign({}, updatedUser), { image: yield (0, UploadToS3_1.getImage)(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.image) }),
                    message: "Update Info updated successfully",
                });
            }
            else {
                return (0, Error_1.throwError)(next, "User not found");
            }
        }
        else {
            return (0, Error_1.throwError)(next, "Invalid data provided");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserPersonalInfo = updateUserPersonalInfo;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { currentPassword, newPassword, confirmPassword } = Validation_1.ChangePasswordSchema.parse(req.body);
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (userId) {
            const existingUser = yield (0, UserQueries_1.getUserPasswordById)(userId);
            if (existingUser) {
                const isPasswordCorrect = yield bcrypt_1.default.compare(currentPassword, existingUser.password);
                if (!isPasswordCorrect) {
                    return (0, Error_1.throwError)(next, "Current password is incorrect");
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield (0, UserQueries_1.updateUserPassword)(userId, hashedPassword);
                res.status(200).json({
                    success: true,
                    message: "Password updated successfully",
                });
            }
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (userId) {
            const categories = yield (0, UserQueries_1.getAllCategoriesQuery)();
            res.status(200).json({
                success: true,
                data: categories,
                message: "Categories fetched successfully",
            });
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategories = getAllCategories;
const getInterestsByCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.userId;
        const { categoryId } = req.params;
        if (userId) {
            const interests = yield (0, UserQueries_1.getAllInterestsQuery)(categoryId);
            res.status(200).json({
                success: true,
                data: interests,
                message: "Interests fetched successfully",
            });
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getInterestsByCategories = getInterestsByCategories;
const addUserInterests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const { interestId } = req.body;
        const userId = (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g.userId;
        if (userId) {
            yield (0, UserQueries_1.addUserInterest)(userId, interestId);
            const userInterests = yield (0, UserQueries_1.getUserInterests)(userId);
            res.status(200).json({
                success: true,
                message: "Interests updated successfully",
                data: userInterests,
            });
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.addUserInterests = addUserInterests;
const removeUserInterests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const { interestId } = req.params;
        const userId = (_h = req === null || req === void 0 ? void 0 : req.user) === null || _h === void 0 ? void 0 : _h.userId;
        if (userId) {
            yield (0, UserQueries_1.removeUserInterest)(userId, interestId);
            const userInterests = yield (0, UserQueries_1.getUserInterests)(userId);
            res.status(200).json({
                success: true,
                message: "Interest removed successfully",
                data: userInterests,
            });
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.removeUserInterests = removeUserInterests;
const getUserAllInterests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const userId = (_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j.userId;
        if (userId) {
            const userInterests = yield (0, UserQueries_1.getUserInterests)(userId);
            res.status(200).json({
                success: true,
                message: "Interests fetched successfully",
                data: userInterests,
            });
        }
        else {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getUserAllInterests = getUserAllInterests;
const getUserCreatedGroups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const userId = (_k = req.user) === null || _k === void 0 ? void 0 : _k.userId;
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
        const pageSize = 10;
        let pageNum = parseInt(req.query.page, 10) || 1;
        if (isNaN(pageNum) || pageNum < 1) {
            pageNum = 1;
        }
        const offset = (pageNum - 1) * pageSize;
        const groups = yield (0, UserQueries_1.getGroupsCreatedByUser)(userId, offset);
        const groupToSend = yield Promise.all(groups.map((group) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const image = yield (0, UploadToS3_1.getImage)(group.image);
                if (image) {
                    return Object.assign(Object.assign({}, group), { image: image });
                }
                return null;
            }
            catch (error) {
                return (0, Error_1.throwError)(next, "Error fetching image:");
            }
        })));
        res.status(200).json({
            success: true,
            message: "Groups fetched successfully",
            data: groupToSend,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserCreatedGroups = getUserCreatedGroups;
