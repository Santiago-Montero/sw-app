import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IStarshipRepository } from '../../domain/repository/starship.repository';
import { Starship } from '../../domain/entity/starship.entity';
import { GetAllStarshipsUsecaseResponse } from '../../domain/dto/get-all-starships.res.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StarshipRepository implements IStarshipRepository {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<GetAllStarshipsUsecaseResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<GetAllStarshipsUsecaseResponse>('/starships'),
    );
    return data;
  }

  async findById(id: string): Promise<Starship> {
    const { data } = await firstValueFrom(
      this.httpService.get<Starship>(`/starships/${id}`),
    );
    return data;
  }
}
