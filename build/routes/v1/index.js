"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const index_1 = require("@config/index");
const ping_route_1 = require("./ping.route");
const baseRouter = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/ping',
        route: ping_route_1.pingRouter,
    },
];
const devRoutes = [];
defaultRoutes.forEach((route) => {
    baseRouter.use(route.path, route.route);
});
/* istanbul ignore next */
if (index_1.config.ENV === 'development') {
    devRoutes.forEach((route) => {
        baseRouter.use(route.path, route.route);
    });
}
exports.routes = baseRouter;
//# sourceMappingURL=index.js.map