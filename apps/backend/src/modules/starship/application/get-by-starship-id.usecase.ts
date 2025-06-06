import { Inject, Injectable } from '@nestjs/common';
import { STARSHIP_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { IStarshipRepository } from '../domain/repository/starship.repository';
import { Starship } from '../domain/entity/starship.entity';
import { IUseCase } from '@shared/interface/usecase';
import { GetByStarshipIdUsecaseRequest } from '../domain/dto/get-by-id-starship.req.dto';

export type IGetStarshipByIdUsecase = IUseCase<
  GetByStarshipIdUsecaseRequest,
  Starship
>;

@Injectable()
export class GetStarshipByIdUseCase implements IGetStarshipByIdUsecase {
  constructor(
    @Inject(STARSHIP_REPOSITORY_TOKEN)
    private readonly starshipRepository: IStarshipRepository,
  ) {}

  async execute(request: GetByStarshipIdUsecaseRequest): Promise<Starship> {
    return this.starshipRepository.findById(request.id);
  }
}
