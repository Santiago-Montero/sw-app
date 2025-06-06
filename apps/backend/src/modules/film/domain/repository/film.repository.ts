import { GetAllFilmsUsecaseParams } from '../dto/get-all-films.req.dto';
import { GetAllFilmsUsecaseResponse } from '../dto/get-all-films.res.dto';
import { Film } from '../entity/film.entity';

export interface IFilmRepository {
  findAll(
    params: GetAllFilmsUsecaseParams,
  ): Promise<GetAllFilmsUsecaseResponse>;
  findById(id: string): Promise<Film>;
}
