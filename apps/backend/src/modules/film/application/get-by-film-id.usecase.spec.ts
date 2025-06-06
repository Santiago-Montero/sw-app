/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { GetByFilmIdUsecase } from '@modules/film/application/get-by-film-id.usecase';
import { FILM_REPOSITORY_TOKEN } from '@modules/film/infrastructure/respository/repository.provider';
import { LOGGER_TOKEN } from '@shared/interface/logger';
import { IFilmRepository } from '@modules/film/domain/repository/film.repository';
import { ILogger } from '@shared/interface/logger';
import { Film } from '@modules/film/domain/entity/film.entity';
import { GetByFilmIdUsecaseRequest } from '@modules/film/domain/dto/get-by-id-film.req.dto';

describe('GetByFilmIdUsecase', () => {
  let usecase: GetByFilmIdUsecase;
  let filmRepository: jest.Mocked<IFilmRepository>;
  let logger: jest.Mocked<ILogger>;

  const mockFilm: Film = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: ['Luke', 'Leia'],
    planets: ['Tatooine'],
    starshipxs: ['X-wing'],
    vehicles: ['Sand Crawler'],
    species: ['Human'],
    created: '2023-01-01T00:00:00.000Z',
    edited: '2023-01-02T00:00:00.000Z',
    url: 'https://swapi.dev/api/films/1/',
  };

  beforeEach(async () => {
    filmRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<IFilmRepository>;

    logger = {
      setContext: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as jest.Mocked<ILogger>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByFilmIdUsecase,
        { provide: FILM_REPOSITORY_TOKEN, useValue: filmRepository },
        { provide: LOGGER_TOKEN, useValue: logger },
      ],
    }).compile();

    usecase = module.get(GetByFilmIdUsecase);
  });

  it('should_return_film_when_valid_id_is_provided', async () => {
    filmRepository.findById.mockResolvedValue(mockFilm);
    const result = await usecase.execute({ id: '1' });
    expect(result).toEqual(mockFilm);
  });

  it('should_log_info_when_executing_retrieval', async () => {
    filmRepository.findById.mockResolvedValue(mockFilm);
    await usecase.execute({ id: '1' });
    expect(logger.info).toHaveBeenCalledWith(
      '[GetByFilmIdUsecase] - Getting film by id',
    );
  });

  it('should_pass_correct_id_to_repository', async () => {
    filmRepository.findById.mockResolvedValue(mockFilm);
    const filmId = '123';
    await usecase.execute({ id: filmId });
    expect(filmRepository.findById).toHaveBeenCalledWith(filmId);
  });

  it('should_throw_error_when_film_not_found', async () => {
    filmRepository.findById.mockResolvedValue(undefined as unknown as Film);
    await expect(usecase.execute({ id: 'not-exist' })).rejects.toThrow();
  });

  it('should_log_and_handle_error_when_repository_throws', async () => {
    const error = new Error('Repository failure');
    filmRepository.findById.mockRejectedValue(error);
    await expect(usecase.execute({ id: '1' })).rejects.toThrow(error);
    expect(logger.info).toHaveBeenCalledWith(
      '[GetByFilmIdUsecase] - Getting film by id',
    );
  });

  it('should_handle_invalid_or_missing_film_id', async () => {
    await expect(
      usecase.execute({} as unknown as GetByFilmIdUsecaseRequest),
    ).rejects.toThrow();
    await expect(usecase.execute({ id: '' })).rejects.toThrow();
    await expect(
      usecase.execute({ id: null as unknown as string }),
    ).rejects.toThrow();
    await expect(
      usecase.execute({ id: undefined as unknown as string }),
    ).rejects.toThrow();
  });
});
