import { People } from '../entity/people.entity';

export type GetAllPeopleUsecaseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: People[];
};
