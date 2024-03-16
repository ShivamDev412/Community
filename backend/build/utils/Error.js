"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const throwError = (next, message) => {
    next({
        message,
    });
};
exports.throwError = throwError;
