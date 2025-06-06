import { IFilmRepository } from '../../domain/repository/film.repository';
import { FileRepository } from './film.repository';
import { Provider } from '@nestjs/common';

export const FILM_REPOSITORY_TOKEN = Symbol('FILM_REPOSITORY');

export const FILM_REPOSITORY_PROVIDER: Provider<IFilmRepository> = {
  provide: FILM_REPOSITORY_TOKEN,
  useClass: FileRepository,
};
