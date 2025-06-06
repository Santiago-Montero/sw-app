import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IGetAllPeopleUsecase } from '../../application/get-all-people.usecase';
import { IGetPeopleByIdUsecase } from '../../application/get-by-people-id.usecase';
import { People } from '../../domain/entity/people.entity';
import { GetAllPeopleUsecaseResponse } from '../../domain/dto/get-all-people.res.dto';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import {
  PEOPLE_USECASES_TOKEN,
  PEOPLE_USECASES_TOKEN_BY_ID,
} from '../../application/people.usecase.provider';

@Controller('people')
export class PeopleController {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(PEOPLE_USECASES_TOKEN)
    private readonly getAllPeopleUseCase: IGetAllPeopleUsecase,
    @Inject(PEOPLE_USECASES_TOKEN_BY_ID)
    private readonly getPeopleByIdUseCase: IGetPeopleByIdUsecase,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('search') search: string,
  ): Promise<GetAllPeopleUsecaseResponse> {
    this.logger.info('[PeopleController] - getAll');
    return this.getAllPeopleUseCase.execute({ page, search });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<People> {
    return this.getPeopleByIdUseCase.execute({ id });
  }
}
