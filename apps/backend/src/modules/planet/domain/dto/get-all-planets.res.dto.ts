import { Planet } from '../entity/planet.entity';

export class GetAllPlanetsUsecaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}
