import { StarshipRepository } from './starship.repository';

export const STARSHIP_REPOSITORY_TOKEN = Symbol('STARSHIP_REPOSITORY');

export const STARSHIP_REPOSITORY_PROVIDER = {
  provide: STARSHIP_REPOSITORY_TOKEN,
  useClass: StarshipRepository,
};
