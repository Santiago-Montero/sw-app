import { Inject, Injectable } from '@nestjs/common';
import { IPlanetRepository } from '../domain/repository/planet.repository';
import { PLANET_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllPlanetsUsecaseResponse } from '../domain/dto/get-all-planets.res.dto';
import { IUseCase } from '@shared/interface/usecase';
import { GetAllPlanetsUsecaseParams } from '../domain/dto/get-all-planets.req.dto';

export type IGetAllPlanetsUsecase = IUseCase<
  GetAllPlanetsUsecaseParams,
  GetAllPlanetsUsecaseResponse
>;

@Injectable()
export class GetAllPlanetsUseCase implements IGetAllPlanetsUsecase {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(PLANET_REPOSITORY_TOKEN)
    private readonly planetRepository: IPlanetRepository,
  ) {}

  async execute(
    params: GetAllPlanetsUsecaseParams,
  ): Promise<GetAllPlanetsUsecaseResponse> {
    this.logger.info('[GetAllPlanetsUseCase] - Getting all planets');
    const response = await this.planetRepository.findAll(params);
    return response;
  }
}
