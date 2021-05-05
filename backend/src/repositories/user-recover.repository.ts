import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UserRecover } from 'src/entities/user-recover';
import RepositoryBase from './repository-base';

@Injectable()
export class UserRecoverRepository extends RepositoryBase<UserRecover> {
  constructor() {
    super('user_recover');
  }

  async add(entity: UserRecover, trx?: Knex.Transaction): Promise<number> {
    return await super.insert(entity, trx);
  }

  async delete(id: number, trx?: Knex.Transaction): Promise<void> {
    await super.delete(id, trx);
  }

  async getByConfirmationCode(confirmationCode: string): Promise<UserRecover> {
    return await super.select('*').where('confirmationCode', confirmationCode).first();
  }
}
