"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
exports.notFound = (req, res, next) => {
    const error = new Error(`NOT FOUND - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.errorHandler = (err, req, res, next) => {
    const statusCode = (res.statusCode = 200 ? 500 : res.statusCode);
    res.status(statusCode).json({
        url: req.originalUrl,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
    next();
};
//# sourceMappingURL=errorMiddleware.js.map