import { Starship } from '../entity/starship.entity';

export type GetAllStarshipsUsecaseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
};
