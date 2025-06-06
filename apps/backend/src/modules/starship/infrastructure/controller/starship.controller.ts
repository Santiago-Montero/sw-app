import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IGetAllStarshipsUsecase } from '../../application/get-all-starships.usecase';
import { IGetStarshipByIdUsecase } from '../../application/get-by-starship-id.usecase';
import { Starship } from '../../domain/entity/starship.entity';
import { GetAllStarshipsUsecaseResponse } from '../../domain/dto/get-all-starships.res.dto';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import {
  STARSHIP_USECASES_TOKEN,
  STARSHIP_USECASES_TOKEN_BY_ID,
} from '../../application/starship.usecase.provider';

@Controller('starship')
export class StarshipController {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(STARSHIP_USECASES_TOKEN)
    private readonly getAllStarshipsUseCase: IGetAllStarshipsUsecase,
    @Inject(STARSHIP_USECASES_TOKEN_BY_ID)
    private readonly getStarshipByIdUseCase: IGetStarshipByIdUsecase,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('search') search: string,
  ): Promise<GetAllStarshipsUsecaseResponse> {
    this.logger.info('[StarshipController] - getAll');
    return this.getAllStarshipsUseCase.execute({ page, search });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Starship> {
    return this.getStarshipByIdUseCase.execute({ id });
  }
}
