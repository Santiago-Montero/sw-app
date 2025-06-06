import { Inject, Injectable } from '@nestjs/common';
import { IPeopleRepository } from '../domain/repository/people.repository';
import { People } from '../domain/entity/people.entity';
import { PEOPLE_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllPeopleUsecaseResponse } from '../domain/dto/get-all-people.res.dto';
import { IUseCase } from '@shared/interface/usecase';
import { GetAllPeopleUsecaseParams } from '../domain/dto/get-all-people.req.dto';

export type IGetAllPeopleUsecase = IUseCase<
  GetAllPeopleUsecaseParams,
  GetAllPeopleUsecaseResponse
>;

@Injectable()
export class GetAllPeopleUseCase implements IGetAllPeopleUsecase {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(PEOPLE_REPOSITORY_TOKEN)
    private readonly peopleRepository: IPeopleRepository,
  ) {}

  async execute(
    params: GetAllPeopleUsecaseParams,
  ): Promise<GetAllPeopleUsecaseResponse> {
    this.logger.info('[GetAllPeopleUseCase] - Getting all people');
    const response = await this.peopleRepository.findAll(params);
    return response;
  }
}
