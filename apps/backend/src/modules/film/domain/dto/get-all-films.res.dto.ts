import { Film } from '../entity/film.entity';

export type GetAllFilmsUsecaseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};
