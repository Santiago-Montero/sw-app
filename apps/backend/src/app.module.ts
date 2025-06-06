import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FilmModule } from './modules/film/film.module';
import { ConfigModule } from './shared/config/config.module';
import { LoggerModule } from './shared/interface/logger/logger.module';
import { PeopleModule } from './modules/people/people.module';
import { PlanetModule } from './modules/planet/planet.module';
import { StarshipModule } from './modules/starship/starship.module';

@Module({
  imports: [
    FilmModule,
    ConfigModule,
    LoggerModule,
    PeopleModule,
    PlanetModule,
    StarshipModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
