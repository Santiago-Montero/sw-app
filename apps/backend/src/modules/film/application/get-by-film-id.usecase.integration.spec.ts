import { Test, TestingModule } from '@nestjs/testing';
import { GetByFilmIdUsecase } from '@modules/film/application/get-by-film-id.usecase';
import { FILM_REPOSITORY_TOKEN } from '@modules/film/infrastructure/respository/repository.provider';
import { LOGGER_TOKEN } from '@shared/interface/logger';
import { FileRepository } from '@modules/film/infrastructure/respository/film.repository';
import { ILogger } from '@shared/interface/logger';
import { HttpModule } from '@nestjs/axios';
import { Agent } from 'https';

describe('GetByFilmIdUsecase Integration Tests', () => {
  let usecase: GetByFilmIdUsecase;
  let logger: jest.Mocked<ILogger>;

  beforeEach(async () => {
    logger = {
      setContext: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    } as jest.Mocked<ILogger>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [],
          useFactory: () => ({
            baseURL: 'https://swapi.dev/api',
            httpsAgent: new Agent({
              rejectUnauthorized: false,
            }),
          }),
          inject: [],
        }),
      ],
      providers: [
        GetByFilmIdUsecase,
        FileRepository,
        { provide: FILM_REPOSITORY_TOKEN, useClass: FileRepository },
        { provide: LOGGER_TOKEN, useValue: logger },
      ],
    }).compile();

    usecase = module.get(GetByFilmIdUsecase);
  });

  it('should_return_film_when_valid_id_is_provided', async () => {
    const result = await usecase.execute({ id: '1' });

    expect(result).toBeDefined();
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('episode_id');
    expect(result).toHaveProperty('opening_crawl');
    expect(result).toHaveProperty('director');
  });

  it('should_return_correct_film_data_for_episode_4', async () => {
    const result = await usecase.execute({ id: '1' });

    expect(result.title).toBe('A New Hope');
    expect(result.episode_id).toBe(4);
    expect(result.director).toBe('George Lucas');
    expect(result.release_date).toBe('1977-05-25');
  });

  it('should_throw_error_when_film_not_found', async () => {
    await expect(usecase.execute({ id: '999999' })).rejects.toThrow();
  });

  it('should_handle_invalid_film_id', async () => {
    await expect(usecase.execute({ id: 'invalid-id' })).rejects.toThrow();
  });

  it('should_log_info_when_executing_retrieval', async () => {
    await usecase.execute({ id: '1' });
    expect(logger.info).toHaveBeenCalledWith(
      '[GetByFilmIdUsecase] - Getting film by id',
    );
  });
});
