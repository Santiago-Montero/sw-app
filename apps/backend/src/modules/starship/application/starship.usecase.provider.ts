import { GetAllStarshipsUseCase } from './get-all-starships.usecase';
import { GetStarshipByIdUseCase } from './get-by-starship-id.usecase';

export const STARSHIP_USECASES_TOKEN = Symbol('GET_ALL_STARSHIPS_USECASE');
export const STARSHIP_USECASES_TOKEN_BY_ID = Symbol(
  'GET_BY_STARSHIP_ID_USECASE',
);

export const STARSHIP_USECASES_PROVIDER = [
  {
    provide: STARSHIP_USECASES_TOKEN,
    useClass: GetAllStarshipsUseCase,
  },
  {
    provide: STARSHIP_USECASES_TOKEN_BY_ID,
    useClass: GetStarshipByIdUseCase,
  },
];
