import { Module } from '@nestjs/common';
import { LoggerModule } from '../../shared/interface/logger/logger.module';

import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '../../shared/config/config.service';
import { ConfigModule } from '../../shared/config/config.module';
import { Agent } from 'https';
import { PeopleController } from './infrastructure/controller/people.controller';
import { PEOPLE_REPOSITORY_PROVIDER } from './infrastructure/respository/repository.provider';
import { PEOPLE_USECASES_PROVIDER } from './application/people.usecase.provider';

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
  controllers: [PeopleController],
  providers: [PEOPLE_REPOSITORY_PROVIDER, ...PEOPLE_USECASES_PROVIDER],
  exports: [],
})
export class PeopleModule {}
