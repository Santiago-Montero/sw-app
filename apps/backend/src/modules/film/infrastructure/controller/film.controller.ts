import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import {
  IGetAllFilmsUsecase,
  IGetByFilmIdUsecase,
  FILM_USECASES_TOKEN,
  FILM_USECASES_TOKEN_BY_ID,
} from '../../application';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllFilmsUsecaseResponse } from '../../domain/dto/get-all-films.res.dto';
import { Film } from '../../domain/entity/film.entity';

@Controller('film')
export class FilmController {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(FILM_USECASES_TOKEN)
    private readonly getAllFilmsUsecase: IGetAllFilmsUsecase,
    @Inject(FILM_USECASES_TOKEN_BY_ID)
    private readonly getByFilmIdUsecase: IGetByFilmIdUsecase,
  ) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('search') search: string,
  ): Promise<GetAllFilmsUsecaseResponse> {
    this.logger.info('[FilmController] - findAll');
    return this.getAllFilmsUsecase.execute({ page, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Film> {
    this.logger.info('[FilmController] - findOne');
    return this.getByFilmIdUsecase.execute({ id });
  }
}
