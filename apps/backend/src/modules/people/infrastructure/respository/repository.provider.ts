import { PeopleRepository } from './people.repository';

export const PEOPLE_REPOSITORY_TOKEN = Symbol('PEOPLE_REPOSITORY');

export const PEOPLE_REPOSITORY_PROVIDER = {
  provide: PEOPLE_REPOSITORY_TOKEN,
  useClass: PeopleRepository,
};
