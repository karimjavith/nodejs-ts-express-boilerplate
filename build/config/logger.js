"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerWrapper = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const index_1 = require("@config/index");
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
const LoggerWrapper = () => {
    return winston_1.default.createLogger({
        level: index_1.config.ENV === 'development' ? 'debug' : 'info',
        format: winston_1.default.format.combine(enumerateErrorFormat(), index_1.config.ENV === 'development'
            ? winston_1.default.format.colorize()
            : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.printf(({ level, message }) => `${level}: ${message}`)),
        transports: [
            new winston_1.default.transports.Console({
                stderrLevels: ['error'],
            }),
        ],
        exitOnError: false,
    });
};
exports.LoggerWrapper = LoggerWrapper;
//# sourceMappingURL=logger.js.map