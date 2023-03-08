import * as moduleAlias from 'module-alias';
const sourcePath = 'src';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
});

import { createServer } from '@server/app';
import { AddressInfo } from 'net';
import http from 'http';
import { LoggerWrapper } from '@config/logger';
import { config } from '@config/index';

const logger = LoggerWrapper();
const host = config.HOST || 'localhost';
const port = config.PORT || '3000';
export async function startServer() {
  const app = createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
    );
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  const signalTraps: NodeJS.Signals[] = ['SIGTERM'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);
      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
