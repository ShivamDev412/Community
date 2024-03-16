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
exports.getImage = exports.uploadToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const sharp_1 = __importDefault(require("sharp"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
dotenv_1.default.config();
// @ts-ignore
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});
const uploadToS3 = (name, image, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    const compressedImage = yield (0, sharp_1.default)(image)
        .resize({
        width: 1920,
        height: 1080,
        fit: "contain",
    })
        .toBuffer();
    const generateRandomName = (byteLength = 32) => {
        const randomBytes = crypto_1.default.randomBytes(byteLength);
        return randomBytes.toString("hex");
    };
    const randomImageName = generateRandomName();
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: randomImageName,
        Body: compressedImage,
        ContentType: contentType,
    };
    try {
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        return randomImageName;
    }
    catch (error) {
        console.error("Error uploading image to S3:", error);
        throw error;
    }
});
exports.uploadToS3 = uploadToS3;
const getImage = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const getObjParam = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: name,
    };
    const command = new client_s3_1.GetObjectCommand(getObjParam);
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 60 * 60 * 24 * 7 });
    if (url) {
        return url;
    }
});
exports.getImage = getImage;
