import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UserWorkType } from 'src/entities/user-work-type';
import RepositoryBase from './repository-base';

@Injectable()
export class UserWorkTypeRepository extends RepositoryBase<UserWorkType> {
  constructor() {
    super('user_work_type');
  }

  async add(entity: UserWorkType, trx?: Knex.Transaction): Promise<number> {
    return await super.insert(entity, trx);
  }
}
