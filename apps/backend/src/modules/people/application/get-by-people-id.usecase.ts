import { Inject, Injectable } from '@nestjs/common';

import { PEOPLE_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { IPeopleRepository } from '../domain/repository/people.repository';
import { People } from '../domain/entity/people.entity';
import { IUseCase } from '@shared/interface/usecase';
import { GetByPeopleIdUsecaseRequest } from '../domain/dto/get-by-id-people.req.dto';

export type IGetPeopleByIdUsecase = IUseCase<
  GetByPeopleIdUsecaseRequest,
  People
>;

@Injectable()
export class GetPeopleByIdUseCase implements IGetPeopleByIdUsecase {
  constructor(
    @Inject(PEOPLE_REPOSITORY_TOKEN)
    private readonly peopleRepository: IPeopleRepository,
  ) {}

  async execute(request: GetByPeopleIdUsecaseRequest): Promise<People> {
    return this.peopleRepository.findById(request.id);
  }
}
