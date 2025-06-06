import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IPeopleRepository } from '../../domain/repository/people.repository';
import { People } from '../../domain/entity/people.entity';
import { ILogger, LOGGER_TOKEN } from '@shared/interface/logger';
import { GetAllPeopleUsecaseResponse } from '../../domain/dto/get-all-people.res.dto';
import { GetAllPeopleUsecaseParams } from '../../domain/dto/get-all-people.req.dto';

@Injectable()
export class PeopleRepository implements IPeopleRepository {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: ILogger,
    private readonly httpService: HttpService,
  ) {}

  async findAll(
    params: GetAllPeopleUsecaseParams,
  ): Promise<GetAllPeopleUsecaseResponse> {
    try {
      this.logger.info('[PeopleRepository] - Getting all people');
      const response =
        await this.httpService.axiosRef.get<GetAllPeopleUsecaseResponse>(
          '/people',
          {
            params: {
              page: params.page,
              search: params.search,
            },
          },
        );
      return response.data;
    } catch (error) {
      this.logger.error(
        '[PeopleRepository] - Error getting all people ' + error,
      );
      throw error;
    }
  }

  async findById(id: string): Promise<People> {
    try {
      this.logger.info('[PeopleRepository] - Getting person by id');
      const response = await this.httpService.axiosRef.get<People>(
        `/people/${id}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        '[PeopleRepository] - Error getting person by id ' + error,
      );
      throw error;
    }
  }
}
