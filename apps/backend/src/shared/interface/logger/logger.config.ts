import { LoggerOptions } from 'pino';
import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config();

const defaultLoggerOptions: LoggerOptions = {
  level: 'info',
  enabled: true,
};

export const createLoggerConfig = (): LoggerOptions => {
  return {
    ...defaultLoggerOptions,
    ...(process.env.LOG_LEVEL && { level: process.env.LOG_LEVEL }),
    ...(process.env.LOG_ENABLED && {
      enabled: process.env.LOG_ENABLED === 'true',
    }),
  };
};
