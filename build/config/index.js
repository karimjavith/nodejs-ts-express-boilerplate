"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
const joi_1 = tslib_1.__importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string()
        .valid('production', 'development', 'test')
        .required(),
    PORT: joi_1.default.number().default(3000),
    HOST: joi_1.default.string(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    ENV: envVars.NODE_ENV,
    PORT: envVars.PORT,
    HOST: envVars.HOST,
};
//# sourceMappingURL=index.js.map