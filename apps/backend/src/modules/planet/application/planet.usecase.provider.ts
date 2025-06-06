import { GetAllPlanetsUseCase } from './get-all-planets.usecase';
import { GetPlanetByIdUseCase } from './get-by-planet-id.usecase';

export const PLANET_USECASES_TOKEN = Symbol('GET_ALL_PLANETS_USECASE');
export const PLANET_USECASES_TOKEN_BY_ID = Symbol('GET_BY_PLANET_ID_USECASE');

export const PLANET_USECASES_PROVIDER = [
  {
    provide: PLANET_USECASES_TOKEN,
    useClass: GetAllPlanetsUseCase,
  },
  {
    provide: PLANET_USECASES_TOKEN_BY_ID,
    useClass: GetPlanetByIdUseCase,
  },
];
