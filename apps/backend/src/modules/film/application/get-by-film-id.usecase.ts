import { Inject } from '@nestjs/common';
import { Film } from '../domain/entity/film.entity';
import { IFilmRepository } from '../domain/repository/film.repository';
import { FILM_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { GetByFilmIdUsecaseRequest } from '../domain/dto/get-by-id-film.req.dto';
import { IUseCase } from '@shared/interface/usecase';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';

export type IGetByFilmIdUsecase = IUseCase<GetByFilmIdUsecaseRequest, Film>;

export class GetByFilmIdUsecase implements IGetByFilmIdUsecase {
  constructor(
    @Inject(FILM_REPOSITORY_TOKEN)
    private readonly filmRepository: IFilmRepository,
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
  ) {}

  async execute(request: GetByFilmIdUsecaseRequest): Promise<Film> {
    this.logger.info('[GetByFilmIdUsecase] - Getting film by id');
    const film = await this.filmRepository.findById(request.id);
    return film;
  }
}
