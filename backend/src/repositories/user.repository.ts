import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { User } from 'src/entities/user';
import RepositoryBase from './repository-base';

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor() {
    super('user');
  }

  get db() {
    return super.db;
  }

  async getById(id: number): Promise<User> {
    return await super
      .select(['id', 'email', 'name', 'active', 'type', 'lastLoginAt', 'createdAt', 'updatedAt'])
      .where('id', id)
      .first();
  }

  async getAll(): Promise<User[]> {
    return await super.select(['id', 'email', 'name', 'active', 'type', 'lastLoginAt', 'createdAt', 'updatedAt']);
  }

  async add(entity: User, trx?: Knex.Transaction): Promise<number> {
    return await super.insert(entity, trx);
  }

  async update(entity: User, trx?: Knex.Transaction): Promise<void> {
    await super.update(entity, trx);
  }

  async delete(id: number, trx?: Knex.Transaction): Promise<void> {
    await super.delete(id, trx);
  }

  async existsByEmail(email: string, excludeId?: number): Promise<boolean> {
    const query = super.select('id').where('email', email);

    if (excludeId) {
      query.whereNot('id', excludeId);
    }

    return !!(await query.first());
  }

  async getByEmailAndPass(email: string, password: string, active: boolean = true): Promise<User> {
    return super
      .select('*')
      .where('email', email)
      .where('password', password)
      .where('active', active ?? true)
      .first();
  }

  async getByEmail(email: string, active: boolean = true): Promise<User> {
    return super
      .select('*')
      .where('email', email)
      .where('active', active ?? true)
      .first();
  }

  async updateLastLoginAt(userId: number, date: Date): Promise<void> {
    await super.baseQuery().update('lastLoginAt', date).where('id', userId);
  }
}
