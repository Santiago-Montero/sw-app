import { Module } from '@nestjs/common';
import { LoggerModule } from '../../shared/interface/logger/logger.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '../../shared/config/config.service';
import { ConfigModule } from '../../shared/config/config.module';
import { Agent } from 'https';
import { PlanetController } from './infrastructure/controller/planet.controller';
import { PLANET_REPOSITORY_PROVIDER } from './infrastructure/respository/repository.provider';
import { PLANET_USECASES_PROVIDER } from './application/planet.usecase.provider';

@Module({
  imports: [
    LoggerModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('HTTP_BASE_URL'),
        httpsAgent: new Agent({
          rejectUnauthorized: false,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PlanetController],
  providers: [PLANET_REPOSITORY_PROVIDER, ...PLANET_USECASES_PROVIDER],
  exports: [],
})
export class PlanetModule {}
