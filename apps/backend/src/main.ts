import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import { ILogger, LOGGER_TOKEN } from './shared/interface/logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors();
  const logger = await app.resolve<ILogger>(LOGGER_TOKEN);
  logger.setContext('Main');
  logger.info('Starting server');
  const port = config.get<string>('PORT') ?? 8080;
  await app.listen(port);
  logger.info(`Server is running on port ${port}`);
}
void bootstrap();
