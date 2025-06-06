import { Inject, Injectable } from '@nestjs/common';
import { ILogger, LOGGER_TOKEN } from '../../../../shared/interface/logger';
import { IFilmRepository } from '../../domain/repository/film.repository';
import { HttpService } from '@nestjs/axios';
import { Film } from '../../domain/entity/film.entity';
import { GetAllFilmsUsecaseResponse } from '../../domain/dto/get-all-films.res.dto';
import { GetAllFilmsUsecaseParams } from '../../domain/dto/get-all-films.req.dto';

@Injectable()
export class FileRepository implements IFilmRepository {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    private readonly httpService: HttpService,
  ) {}

  async findAll(
    params: GetAllFilmsUsecaseParams,
  ): Promise<GetAllFilmsUsecaseResponse> {
    try {
      this.logger.info('[FilmRepository] - Finding all movies');
      const response =
        await this.httpService.axiosRef.get<GetAllFilmsUsecaseResponse>(
          '/films',
          {
            params: {
              page: params.page,
              search: params.search,
            },
          },
        );
      return response.data;
    } catch (error) {
      this.logger.error('[FilmRepository] - Error finding all movies ' + error);
      throw error;
    }
  }

  async findById(id: string): Promise<Film> {
    try {
      this.logger.info('[FilmRepository] - Finding film by id');
      const response = await this.httpService.axiosRef.get<Film>(
        `/films/${id}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('[FilmRepository] - Error finding film by id ' + error);
      throw error;
    }
  }
}
