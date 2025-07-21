"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const statusCode = 400;
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
