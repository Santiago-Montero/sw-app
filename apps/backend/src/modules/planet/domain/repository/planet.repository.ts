import { GetAllPlanetsUsecaseParams } from '../dto/get-all-planets.req.dto';
import { GetAllPlanetsUsecaseResponse } from '../dto/get-all-planets.res.dto';
import { Planet } from '../entity/planet.entity';

export interface IPlanetRepository {
  findAll(
    params: GetAllPlanetsUsecaseParams,
  ): Promise<GetAllPlanetsUsecaseResponse>;
  findById(id: string): Promise<Planet>;
}
