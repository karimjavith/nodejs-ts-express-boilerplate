"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const index_1 = require("@config/index");
const logger_1 = require("@config/logger");
const ApiError_1 = require("@utils/ApiError");
const logger = (0, logger_1.LoggerWrapper)();
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error.statusCode
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, _req, res, 
// eslint-disable-next-line no-unused-vars
_next) => {
    let { statusCode, message } = err;
    if (index_1.config.ENV === 'production' && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = Object.assign({ code: statusCode, message }, (index_1.config.ENV === 'development' && { stack: err.stack }));
    if (index_1.config.ENV === 'development') {
        logger.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map