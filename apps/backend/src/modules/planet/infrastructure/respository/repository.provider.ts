import { PlanetRepository } from './planet.repository';

export const PLANET_REPOSITORY_TOKEN = Symbol('PLANET_REPOSITORY');

export const PLANET_REPOSITORY_PROVIDER = {
  provide: PLANET_REPOSITORY_TOKEN,
  useClass: PlanetRepository,
};
