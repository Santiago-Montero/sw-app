import { Inject, Injectable } from '@nestjs/common';
import { IStarshipRepository } from '../domain/repository/starship.repository';
import { STARSHIP_REPOSITORY_TOKEN } from '../infrastructure/respository/repository.provider';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllStarshipsUsecaseResponse } from '../domain/dto/get-all-starships.res.dto';
import { IUseCase } from '@shared/interface/usecase';
import { GetAllStarshipsUsecaseParams } from '../domain/dto/get-all-starships.req.dto';

export type IGetAllStarshipsUsecase = IUseCase<
  GetAllStarshipsUsecaseParams,
  GetAllStarshipsUsecaseResponse
>;

@Injectable()
export class GetAllStarshipsUseCase implements IGetAllStarshipsUsecase {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    @Inject(STARSHIP_REPOSITORY_TOKEN)
    private readonly starshipRepository: IStarshipRepository,
  ) {}

  async execute(
    params: GetAllStarshipsUsecaseParams,
  ): Promise<GetAllStarshipsUsecaseResponse> {
    this.logger.info('[GetAllStarshipsUseCase] - Getting all starships');
    const response = await this.starshipRepository.findAll(params);
    return response;
  }
}
