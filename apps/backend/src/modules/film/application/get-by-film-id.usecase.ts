import { Film } from '../domain/entity/film.entity';
import { GetByFilmIdUsecaseRequest } from '../domain/dto/get-by-id-film.req.dto';
import { IUseCase } from '@shared/interface/usecase';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { FILM_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { IFilmRepository } from '../domain/repository/film.repository';

export type IGetByFilmIdUsecase = IUseCase<GetByFilmIdUsecaseRequest, Film>;

export class GetByFilmIdUsecase implements IGetByFilmIdUsecase {
  constructor(
    @Inject(FILM_REPOSITORY_TOKEN)
    private readonly filmRepository: IFilmRepository,
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
  ) {
    this.logger.setContext(GetByFilmIdUsecase.name);
  }

  async execute(request: GetByFilmIdUsecaseRequest): Promise<Film> {
    this.logger.info('[GetByFilmIdUsecase] - Getting film by id');

    if (!request?.id) {
      this.logger.error('[GetByFilmIdUsecase] - Film ID is required');
      throw new BadRequestException('Film ID is required');
    }

    const film = await this.filmRepository.findById(request.id);

    if (!film) {
      this.logger.error('[GetByFilmIdUsecase] - Film not found');
      throw new NotFoundException('Film not found');
    }

    return film;
  }
}
