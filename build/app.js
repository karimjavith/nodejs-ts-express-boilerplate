"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const xss_clean_1 = tslib_1.__importDefault(require("xss-clean"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const error_1 = require("@middleware/error");
const v1_1 = require("@routes/v1");
const ApiError_1 = require("@utils/ApiError");
const createServer = () => {
    const app = (0, express_1.default)();
    // set security HTTP headers
    app.use((0, helmet_1.default)());
    // parse json request body
    app.use(express_1.default.json());
    // parse urlencoded request body
    app.use(express_1.default.urlencoded({ extended: true }));
    // sanitize request data
    app.use((0, xss_clean_1.default)());
    // gzip compression
    app.use((0, compression_1.default)());
    // enable cors
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    // v1 api routes
    app.use('/v1', v1_1.routes);
    // send back a 404 error for any unknown api request
    app.use((_req, _res, next) => {
        next(new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Not found'));
    });
    // convert error to ApiError, if needed
    app.use(error_1.errorConverter);
    // handle error
    app.use(error_1.errorHandler);
    app.disable('x-powered-by');
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=app.js.map