"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const ApiError_1 = require("@utils/ApiError");
const pick_1 = require("@utils/pick");
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, pick_1.pick)(schema, ['params', 'query', 'body']);
    const object = (0, pick_1.pick)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map