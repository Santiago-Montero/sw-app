import { GetAllFilmsUsecase } from './get-all-films.usecase';
import { GetByFilmIdUsecase } from './get-by-film-id.usecase';
import { Provider } from '@nestjs/common';

export const FILM_USECASES_TOKEN = Symbol('GET_ALL_FILMS_USECASE');
export const FILM_USECASES_TOKEN_BY_ID = Symbol('GET_BY_FILM_ID_USECASE');

export const FILM_USECASES_PROVIDER: Provider[] = [
  {
    provide: FILM_USECASES_TOKEN,
    useClass: GetAllFilmsUsecase,
  },
  {
    provide: FILM_USECASES_TOKEN_BY_ID,
    useClass: GetByFilmIdUsecase,
  },
];
