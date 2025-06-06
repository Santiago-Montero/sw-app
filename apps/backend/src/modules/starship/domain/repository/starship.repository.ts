import { GetAllStarshipsUsecaseParams } from '../dto/get-all-starships.req.dto';
import { GetAllStarshipsUsecaseResponse } from '../dto/get-all-starships.res.dto';
import { Starship } from '../entity/starship.entity';

export interface IStarshipRepository {
  findAll(
    params: GetAllStarshipsUsecaseParams,
  ): Promise<GetAllStarshipsUsecaseResponse>;
  findById(id: string): Promise<Starship>;
}
