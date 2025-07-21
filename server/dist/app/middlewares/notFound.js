"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFound = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: "fail",
        message: "Not found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "Api not found"
            }
        ]
    });
    next();
};
exports.default = notFound;
