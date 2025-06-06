import { GetAllPeopleUseCase } from './get-all-people.usecase';
import { GetPeopleByIdUseCase } from './get-by-people-id.usecase';

export const PEOPLE_USECASES_TOKEN = Symbol('GET_ALL_PEOPLE_USECASE');
export const PEOPLE_USECASES_TOKEN_BY_ID = Symbol('GET_BY_PEOPLE_ID_USECASE');

export const PEOPLE_USECASES_PROVIDER = [
  {
    provide: PEOPLE_USECASES_TOKEN,
    useClass: GetAllPeopleUseCase,
  },
  {
    provide: PEOPLE_USECASES_TOKEN_BY_ID,
    useClass: GetPeopleByIdUseCase,
  },
];
