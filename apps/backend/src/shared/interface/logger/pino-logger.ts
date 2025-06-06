import { Injectable } from '@nestjs/common';
import { ILogger } from './loger.interface';
import pino from 'pino';

@Injectable()
export class PinoLogger implements ILogger {
  private readonly logger: pino.Logger;
  private readonly starWarsPrefixes = {
    info: '🪐 [Jedi Council]',
    error: '⚔️ [Dark Side]',
    warn: '🚀 [Rebel Alliance]',
    debug: '🔧 [Droid]',
  };

  constructor() {
    this.logger = pino();
  }

  setContext(context: string) {
    this.logger.child({ context });
  }

  info(message: string, context?: string) {
    const prefix = this.starWarsPrefixes.info;
    this.logger.info(`${prefix} ${message}`, { context });
  }

  error(message: string, trace?: string, context?: string) {
    const prefix = this.starWarsPrefixes.error;
    this.logger.error(`${prefix} ${message}`, { trace, context });
  }

  warn(message: string, context?: string) {
    const prefix = this.starWarsPrefixes.warn;
    this.logger.warn(`${prefix} ${message}`, { context });
  }

  debug(message: string, context?: string) {
    const prefix = this.starWarsPrefixes.debug;
    this.logger.debug(`${prefix} ${message}`, { context });
  }
}
