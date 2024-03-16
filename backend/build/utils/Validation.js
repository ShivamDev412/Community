"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = exports.LoginSchema = exports.ChangePasswordSchema = exports.PersonalInfoSchema = exports.EditProfileSchema = exports.NewGroupSchema = void 0;
const zod_1 = require("zod");
const moment_1 = __importDefault(require("moment"));
const LoginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Invalid email format" })
        .refine((email) => !!email, { message: "Email is required" }),
    password: zod_1.z.string().nonempty({ message: "Password is required" }),
});
exports.LoginSchema = LoginSchema;
const SignupSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3)
        .regex(/^[a-zA-Z\s]+$/, {
        message: "Name must contain only letters and spaces",
    })
        .refine((name) => !!name, { message: "Name is required" }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email format" })
        .refine((email) => !!email, { message: "Email is required" }),
    password: zod_1.z
        .string()
        .min(6)
        .refine((password) => {
        return (/[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[^a-zA-Z0-9\s]/.test(password));
    }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
    }),
});
exports.SignupSchema = SignupSchema;
exports.NewGroupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    about: zod_1.z.string().min(1, "About is required"),
    group_type: zod_1.z.string().min(1, "Group Type is required"),
    image: zod_1.z.any().refine((value) => {
        return value !== null;
    }, {
        message: "Group Image is required",
    }),
    location: zod_1.z.string().min(1, "Group Location is required"),
});
exports.EditProfileSchema = zod_1.z.object({
    image: zod_1.z.string().optional(),
    name: zod_1.z
        .string()
        .min(1, "Name is required")
        .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters"),
    address: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
});
exports.PersonalInfoSchema = zod_1.z.object({
    birthday: zod_1.z.string().refine((value) => {
        if (!value)
            return true;
        const birthDate = (0, moment_1.default)(value);
        const age = (0, moment_1.default)().diff(birthDate, 'years');
        return age >= 18 && age <= 60;
    }, {
        message: "You must be at least 18 years old and at most 60 years old.",
    }).optional(),
    gender: zod_1.z.string().optional(),
    lookingFor: zod_1.z.array(zod_1.z.string()).optional(),
    lifeStages: zod_1.z.array(zod_1.z.string()).optional()
});
exports.ChangePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z.string().min(1, "Current Password is required"),
    newPassword: zod_1.z
        .string()
        .min(1, "New Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/, "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"),
    confirmPassword: zod_1.z.string().min(1, "Confirm Password is required"),
})
    .superRefine(({ confirmPassword, newPassword, currentPassword }, ctx) => {
    if (currentPassword === newPassword) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Your old password and new password should not be same",
            path: ["newPassword"],
        });
    }
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "New Password and Confirm Password do not match",
            path: ["confirmPassword"],
        });
    }
});
