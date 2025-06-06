import { GetAllPeopleUsecaseParams } from '../dto/get-all-people.req.dto';
import { GetAllPeopleUsecaseResponse } from '../dto/get-all-people.res.dto';
import { People } from '../entity/people.entity';

export interface IPeopleRepository {
  findAll(
    params: GetAllPeopleUsecaseParams,
  ): Promise<GetAllPeopleUsecaseResponse>;
  findById(id: string): Promise<People>;
}
