import { Module } from '@nestjs/common';
import { LoggerModule } from '../../shared/interface/logger/logger.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '../../shared/config/config.service';
import { ConfigModule } from '../../shared/config/config.module';
import { Agent } from 'https';
import { StarshipController } from './infrastructure/controller/starship.controller';
import { STARSHIP_REPOSITORY_PROVIDER } from './infrastructure/respository/repository.provider';
import { STARSHIP_USECASES_PROVIDER } from './application/starship.usecase.provider';

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
  controllers: [StarshipController],
  providers: [STARSHIP_REPOSITORY_PROVIDER, ...STARSHIP_USECASES_PROVIDER],
  exports: [],
})
export class StarshipModule {}
