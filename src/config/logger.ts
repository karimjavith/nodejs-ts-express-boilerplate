import winston from 'winston';
import { config } from '@config/index';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    level: config.ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
      enumerateErrorFormat(),
      config.ENV === 'development'
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${message}`),
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ['error'],
      }),
    ],
    exitOnError: false,
  });
};

export { LoggerWrapper };
