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
exports.searchByNameAndLocation = void 0;
const Error_1 = require("../utils/Error");
const searchByNameAndLocation = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { event, city, state } = request.query;
        const userId = (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return (0, Error_1.throwError)(next, "User not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.searchByNameAndLocation = searchByNameAndLocation;
