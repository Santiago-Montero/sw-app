import { Module } from '@nestjs/common';
import { LoggerModule } from '../../shared/interface/logger/logger.module';
import { FilmController } from './infrastructure/controller/film.controller';
import { FILM_REPOSITORY_PROVIDER } from './infrastructure/respository/repository.provider';
import { FILM_USECASES_PROVIDER } from './application/film.usecase.provider';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '../../shared/config/config.service';
import { ConfigModule } from '../../shared/config/config.module';
import { Agent } from 'https';

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
  controllers: [FilmController],
  providers: [FILM_REPOSITORY_PROVIDER, ...FILM_USECASES_PROVIDER],
  exports: [],
})
export class FilmModule {}
