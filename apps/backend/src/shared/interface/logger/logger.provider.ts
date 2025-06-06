import { Provider, Scope } from '@nestjs/common';
import { PinoLogger } from './pino-logger';
import { ILogger } from './loger.interface';

export const LOGGER_TOKEN = Symbol('LOGGER');

export const LOGGER_PROVIDER: Provider<ILogger> = {
  provide: LOGGER_TOKEN,
  useClass: PinoLogger,
  scope: Scope.TRANSIENT,
};
