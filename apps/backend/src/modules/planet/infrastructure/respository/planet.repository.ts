import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IPlanetRepository } from '../../domain/repository/planet.repository';
import { Planet } from '../../domain/entity/planet.entity';
import { GetAllPlanetsUsecaseResponse } from '../../domain/dto/get-all-planets.res.dto';
import { firstValueFrom } from 'rxjs';
import { GetAllPlanetsUsecaseParams } from '../../domain/dto/get-all-planets.req.dto';
import { ILogger, LOGGER_TOKEN } from '../../../../shared/interface/logger';

@Injectable()
export class PlanetRepository implements IPlanetRepository {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    private readonly httpService: HttpService,
  ) {}

  async findAll(
    params: GetAllPlanetsUsecaseParams,
  ): Promise<GetAllPlanetsUsecaseResponse> {
    this.logger.info('[PlanetRepository] - Finding all planets');
    const { data } = await firstValueFrom(
      this.httpService.get<GetAllPlanetsUsecaseResponse>('/planets', {
        params: {
          page: params.page,
          search: params.search,
        },
      }),
    );
    return data;
  }

  async findById(id: string): Promise<Planet> {
    this.logger.info('[PlanetRepository] - Finding planet by id');
    const { data } = await firstValueFrom(
      this.httpService.get<Planet>(`/planets/${id}`),
    );
    return data;
  }
}
