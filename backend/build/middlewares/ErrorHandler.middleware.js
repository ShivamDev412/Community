"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const isZodError = (error) => {
    return error instanceof zod_1.ZodError;
};
class NotFoundError extends Error {
}
class UnauthorizedError extends Error {
}
class ForbiddenError extends Error {
}
const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);
    if (isZodError(err) || (err === null || err === void 0 ? void 0 : err.code) === "custom") {
        const validationErrors = isZodError(err)
            ? err.errors.map((error) => error.message)
            : [err.message];
        console.error("Validation Errors:", validationErrors);
        res.status(400).json({
            success: false,
            error: "Validation Error",
            details: validationErrors,
        });
    }
    else if (err instanceof NotFoundError) {
        res.status(404).json({
            success: false,
            error: "Resource Not Found",
        });
    }
    else if (err instanceof UnauthorizedError) {
        res.status(401).json({
            success: false,
            error: "Unauthorized",
        });
    }
    else if (err instanceof ForbiddenError) {
        res.status(403).json({
            success: false,
            error: "Forbidden",
        });
    }
    else {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: err.message,
        });
    }
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
