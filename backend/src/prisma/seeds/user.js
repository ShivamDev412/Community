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
const db_config_1 = __importDefault(require("../../src/database/db.config"));
const getAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_config_1.default.user.findMany();
    console.log(users);
});
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.user.delete({
        where: {
            id: "clutn9d7m00014bjsdu6xcx56"
        }
    });
});
const getGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield db_config_1.default.group.findMany();
    console.log(groups);
});
// deleteUser()
const deleteAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_config_1.default.event.deleteMany();
    yield db_config_1.default.userEvent.deleteMany();
    yield db_config_1.default.userGroup.deleteMany();
    yield db_config_1.default.group.deleteMany();
});
// deleteAllGroups()
// getGroups()
getAdminUser();
