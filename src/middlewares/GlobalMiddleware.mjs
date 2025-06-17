import { user_error, system_error } from "../responses/ErrorResponse.mjs";  // Custom error classes

export const GlobalMiddleware = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;


    if (err instanceof user_error) {
        return res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    }


    if (err instanceof system_error) {
        return res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    }


    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size is too large. Maximum allowed size is 5MB.',
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            success: false,
            message: 'Too many files uploaded. Please upload only 1 file.',
        });
    }


    console.error(err.message);
    return res.status(statusCode).json({
        success: false,
        message: "Server failure!!",
    });
};
