import { Knex, knex } from 'knex';
import BaseEntity from 'src/entities/base-entity';
import * as knexConfig from '../../knexfile';
import { appConfig, KnexConfig } from 'src/app.config';

export default abstract class RepositoryBase<T extends BaseEntity> {
  private connection: Knex;

  constructor(private tableName: string) {
    const config = knexConfig as KnexConfig;
    this.connection = knex(config[appConfig.NODE_ENV]);
  }

  protected get db() {
    return this.connection;
  }

  protected baseQuery(): Knex.QueryBuilder {
    return this.connection(this.tableName);
  }

  protected select(columns: string[] | string = null): Knex.QueryBuilder {
    const query = this.connection<T>(this.tableName);

    if (columns) {
      return query.select(columns);
    }

    return query;
  }

  protected async insert(entity: T, trx?: Knex.Transaction): Promise<number> {
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    let query = this.connection(this.tableName).insert(entity, 'id');

    if (trx) {
      query = query.transacting(trx);
    }

    const [id] = await query;

    return id;
  }

  protected async update(entity: T, trx?: Knex.Transaction): Promise<void> {
    let query = this.connection(this.tableName).where('id', entity.id).update(entity);

    if (trx) {
      query = query.transacting(trx);
    }

    await query;
  }

  protected async delete(id: number, trx?: Knex.Transaction): Promise<void> {
    let query = this.connection(this.tableName).where('id', id).delete();

    if (trx) {
      query = query.transacting(trx);
    }

    await query;
  }
}
