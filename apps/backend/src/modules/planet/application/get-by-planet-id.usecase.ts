import { Inject, Injectable } from '@nestjs/common';
import { PLANET_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { IPlanetRepository } from '../domain/repository/planet.repository';
import { Planet } from '../domain/entity/planet.entity';
import { IUseCase } from '@shared/interface/usecase';
import { GetByPlanetIdUsecaseRequest } from '../domain/dto/get-by-id-planet.req.dto';

export type IGetPlanetByIdUsecase = IUseCase<
  GetByPlanetIdUsecaseRequest,
  Planet
>;

@Injectable()
export class GetPlanetByIdUseCase implements IGetPlanetByIdUsecase {
  constructor(
    @Inject(PLANET_REPOSITORY_TOKEN)
    private readonly planetRepository: IPlanetRepository,
  ) {}

  async execute(request: GetByPlanetIdUsecaseRequest): Promise<Planet> {
    return this.planetRepository.findById(request.id);
  }
}
