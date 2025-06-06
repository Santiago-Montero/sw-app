import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IGetAllPlanetsUsecase } from '../../application/get-all-planets.usecase';
import { IGetPlanetByIdUsecase } from '../../application/get-by-planet-id.usecase';
import { Planet } from '../../domain/entity/planet.entity';
import { GetAllPlanetsUsecaseResponse } from '../../domain/dto/get-all-planets.res.dto';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import {
  PLANET_USECASES_TOKEN,
  PLANET_USECASES_TOKEN_BY_ID,
} from '../../application/planet.usecase.provider';

@Controller('planet')
export class PlanetController {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(PLANET_USECASES_TOKEN)
    private readonly getAllPlanetsUseCase: IGetAllPlanetsUsecase,
    @Inject(PLANET_USECASES_TOKEN_BY_ID)
    private readonly getPlanetByIdUseCase: IGetPlanetByIdUsecase,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('search') search: string,
  ): Promise<GetAllPlanetsUsecaseResponse> {
    this.logger.info('[PlanetController] - getAll');
    return this.getAllPlanetsUseCase.execute({ page, search });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Planet> {
    return this.getPlanetByIdUseCase.execute({ id });
  }
}
