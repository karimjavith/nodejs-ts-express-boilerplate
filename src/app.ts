import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import compression from 'compression';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from '@middleware/error';
import { routes } from '@routes/v1';
import { ApiError } from '@utils/ApiError';

const createServer = (): express.Application => {
  const app = express();

  // set security HTTP headers
  app.use(helmet());

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  // v1 api routes
  app.use('/v1', routes);

  // send back a 404 error for any unknown api request
  app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  app.disable('x-powered-by');
  return app;
};

export { createServer };
