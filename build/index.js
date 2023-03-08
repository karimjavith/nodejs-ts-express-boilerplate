"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moduleAlias = tslib_1.__importStar(require("module-alias"));
const sourcePath = 'src';
moduleAlias.addAliases({
    '@server': sourcePath,
    '@config': `${sourcePath}/config`,
});
const app_1 = require("@server/app");
const http_1 = tslib_1.__importDefault(require("http"));
const logger_1 = require("@config/logger");
const index_1 = require("@config/index");
const logger = (0, logger_1.LoggerWrapper)();
const host = index_1.config.HOST || 'localhost';
const port = index_1.config.PORT || '3000';
function startServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = (0, app_1.createServer)();
        const server = http_1.default.createServer(app).listen({ host, port }, () => {
            const addressInfo = server.address();
            logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
        });
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    logger.info('Server closed');
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        };
        const unexpectedErrorHandler = (error) => {
            logger.error(error);
            exitHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        const signalTraps = ['SIGTERM'];
        signalTraps.forEach((type) => {
            process.once(type, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                logger.info(`process.once ${type}`);
                if (server) {
                    server.close(() => {
                        logger.debug('HTTP server closed');
                    });
                }
            }));
        });
    });
}
startServer();
//# sourceMappingURL=index.js.map