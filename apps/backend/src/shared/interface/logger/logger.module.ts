import { Global, Module } from '@nestjs/common';
import { LOGGER_PROVIDER, LOGGER_TOKEN } from './logger.provider';

@Global()
@Module({
  providers: [LOGGER_PROVIDER],
  exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
