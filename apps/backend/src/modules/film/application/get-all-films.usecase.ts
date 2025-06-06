import { Inject } from '@nestjs/common';
import { IUseCase } from '@shared/interface/usecase';
import { IFilmRepository } from '../domain/repository/film.repository';
import { FILM_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllFilmsUsecaseResponse } from '../domain/dto/get-all-films.res.dto';
import { GetAllFilmsUsecaseParams } from '../domain/dto/get-all-films.req.dto';

export type IGetAllFilmsUsecase = IUseCase<
  GetAllFilmsUsecaseParams,
  GetAllFilmsUsecaseResponse
>;

export class GetAllFilmsUsecase implements IGetAllFilmsUsecase {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(FILM_REPOSITORY_TOKEN)
    private readonly filmRepository: IFilmRepository,
  ) {
    this.logger.setContext(GetAllFilmsUsecase.name);
  }

  async execute(
    params: GetAllFilmsUsecaseParams,
  ): Promise<GetAllFilmsUsecaseResponse> {
    this.logger.info('[GetAllFilmsUsecase] - Getting all films');
    const response = await this.filmRepository.findAll(params);
    this.logger.info(
      `[GetAllFilmsUsecase] - Found ${response ? response.results.length : 0} films`,
    );
    return response;
  }
}
