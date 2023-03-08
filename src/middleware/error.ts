import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { config } from '@config/index';
import { LoggerWrapper } from '@config/logger';
import { ApiError } from '@utils/ApiError';

const logger = LoggerWrapper();
const errorConverter = (
  err,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  let { statusCode, message } = err;
  if (config.ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.ENV === 'development' && { stack: err.stack }),
  };

  if (config.ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
