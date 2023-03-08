"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const pingRouter = express_1.default.Router();
exports.pingRouter = pingRouter;
pingRouter.route('/').get((_req, res) => {
    res.send('ping successful');
});
//# sourceMappingURL=ping.route.js.map