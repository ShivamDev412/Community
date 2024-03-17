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
exports.checkGroupExists = exports.getGroupsCreatedByUser = exports.removeUserInterest = exports.getUserInterests = exports.addUserInterest = exports.getAllInterestsQuery = exports.getAllCategoriesQuery = exports.updateUserPassword = exports.updateUserProfileInfo = exports.updateUserProfileById = exports.getEventById = exports.addEvent = exports.getAllInterests = exports.getGroupsByOrganizedBy = exports.addUserGroup = exports.getGroupByName = exports.getGroupById = exports.getUserGroupsQuery = exports.addNewUser = exports.getUserNameById = exports.getUserByEmail = exports.getUserPasswordById = exports.getUserById = void 0;
const _1 = __importDefault(require("."));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `SELECT user_id, name, email, location, joined_on, image, bio, dob, sex, joined_on, looking_for, life_state FROM users WHERE user_id = ${id}`;
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
});
exports.getUserById = getUserById;
const getUserPasswordById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `SELECT password FROM users WHERE user_id = ${userId}`;
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
});
exports.getUserPasswordById = getUserPasswordById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `SELECT * FROM users WHERE email = ${email}`;
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
});
exports.getUserByEmail = getUserByEmail;
const getUserNameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `SELECT name FROM users WHERE user_id = ${id}`;
    if (result && result.length > 0) {
        return result[0];
    }
    return null;
});
exports.getUserNameById = getUserNameById;
const addNewUser = (name, email, password, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, _1.default) `
      INSERT INTO users (name, email, password, image) 
      VALUES (${name}, ${email}, ${password}, ${imageUrl})
      RETURNING user_id, email;
    `;
    if (newUser.length === 0) {
        return null;
    }
    return newUser[0];
});
exports.addNewUser = addNewUser;
const getUserGroupsQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `
    SELECT g.*
    FROM groups g
    JOIN user_groups ug ON g.group_id = ug.group_id
    WHERE ug.user_id = ${userId}
  `;
    return result;
});
exports.getUserGroupsQuery = getUserGroupsQuery;
const getGroupById = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `
    SELECT *
    FROM groups WHERE group_id = ${groupId}
  `;
    return result[0];
});
exports.getGroupById = getGroupById;
const getGroupByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, _1.default) `
    SELECT *
    FROM groups WHERE name = ${name}
  `;
    return result[0];
});
exports.getGroupByName = getGroupByName;
const addUserGroup = (name, groupType, location, organizedBy, about, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      INSERT INTO groups (name, group_type, location, organized_by, about, image)
      VALUES (${name}, ${groupType}, ${location}, ${organizedBy}, ${about}, ${image})
      RETURNING group_id;
    `;
        const newGroup = yield (0, exports.getGroupById)(result[0].group_id);
        return newGroup;
    }
    catch (error) {
        console.error("Error adding user group:", error);
        return null;
    }
});
exports.addUserGroup = addUserGroup;
const getGroupsByOrganizedBy = (organizedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT * 
      FROM groups 
      WHERE organized_by = ${organizedBy};
    `;
        return result;
    }
    catch (error) {
        console.error("Error fetching groups by organized_by:", error);
        return [];
    }
});
exports.getGroupsByOrganizedBy = getGroupsByOrganizedBy;
const getAllInterests = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT * FROM interests;
    `;
        return result;
    }
    catch (error) {
        console.error("Error fetching all tags:", error);
        return [];
    }
});
exports.getAllInterests = getAllInterests;
const addEvent = (name, image, details, hostId, groupId, eventDate, eventTime, eventType, link, address, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      INSERT INTO events (name, image, details, host_id, group_id, event_date, event_time, event_type, link, address, tags)
      VALUES (${name}, ${image}, ${details}, ${hostId}, ${groupId}, ${eventDate}, ${eventTime}, ${eventType}, ${link}, ${address}, ${tags})
      RETURNING event_id;
    `;
        const newEvent = yield (0, exports.getEventById)(result[0].event_id);
        return newEvent;
    }
    catch (error) {
        console.error("Error adding event:", error);
        return null;
    }
});
exports.addEvent = addEvent;
const getEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT *
      FROM events
      WHERE event_id = ${eventId};
    `;
        return result[0];
    }
    catch (error) {
        console.error("Error fetching event by ID:", error);
        return null;
    }
});
exports.getEventById = getEventById;
const updateUserProfileById = (userId, name, image, bio, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, _1.default) `
      UPDATE users
      SET name = ${name},
          image = ${image},
          bio = ${bio},
          location = ${location},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
    `;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
});
exports.updateUserProfileById = updateUserProfileById;
const updateUserProfileInfo = (userId, dob, sex, lookingFor, lifeState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, _1.default) `
      UPDATE users
      SET dob = ${dob},
          sex = ${sex},
          looking_for = ${lookingFor},
          life_state = ${lifeState},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
    `;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
});
exports.updateUserProfileInfo = updateUserProfileInfo;
const updateUserPassword = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, password);
    try {
        yield (0, _1.default) `
      UPDATE users
      SET password = ${password},
      updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
      
    `;
    }
    catch (error) {
        console.error("Error updating user password:", error);
        throw error;
    }
});
exports.updateUserPassword = updateUserPassword;
const getAllCategoriesQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT * FROM categories;
    `;
        return result;
    }
    catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }
});
exports.getAllCategoriesQuery = getAllCategoriesQuery;
const getAllInterestsQuery = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT * FROM interests WHERE category_id = ${categoryId};
    `;
        return result;
    }
    catch (error) {
        console.error("Error fetching all interests:", error);
        throw error;
    }
});
exports.getAllInterestsQuery = getAllInterestsQuery;
const addUserInterest = (userId, interestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, _1.default) `
      INSERT INTO user_interests (user_id, interest_id)
      VALUES (${userId}, ${interestId});
    `;
    }
    catch (error) {
        console.error("Error adding user interest:", error);
        throw error;
    }
});
exports.addUserInterest = addUserInterest;
const getUserInterests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
      SELECT interests.interest_id, interests.name
      FROM interests
      JOIN user_interests ON interests.interest_id = user_interests.interest_id
      WHERE user_interests.user_id = ${userId};
    `;
        return result;
    }
    catch (error) {
        console.error("Error getting user interests:", error);
        throw error;
    }
});
exports.getUserInterests = getUserInterests;
const removeUserInterest = (userId, interestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, _1.default) `
      DELETE FROM user_interests
      WHERE user_id = ${userId} AND interest_id = ${interestId};
    `;
    }
    catch (error) {
        console.error("Error removing user interest:", error);
        throw error;
    }
});
exports.removeUserInterest = removeUserInterest;
const getGroupsCreatedByUser = (userId, offset) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 10;
    try {
        const result = yield (0, _1.default) `
      SELECT * FROM groups WHERE organized_by = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
        return result;
    }
    catch (error) {
        console.error(`Error getting groups created by user ${userId}:`, error);
        throw error;
    }
});
exports.getGroupsCreatedByUser = getGroupsCreatedByUser;
const checkGroupExists = (groupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, _1.default) `
    SELECT *
    FROM groups
    WHERE name = ${groupName}
    `;
        return result;
    }
    catch (error) {
        console.error(`Error checking if group ${groupName} exists:`, error);
        throw error;
    }
});
exports.checkGroupExists = checkGroupExists;
