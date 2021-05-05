import { Knex, knex } from "knex";
import BaseEntity from "src/entities/base-entity";
import * as knexConfig from "../../knexfile";
import { appConfig, KnexConfig } from "src/app.config";

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

  protected async insert(entity: T): Promise<number> {
    const [id] = await this.connection(this.tableName)
      .insert(entity)
      .returning("id");

    return id;
  }

  protected async update(entity: T): Promise<void> {
    return this.connection(this.tableName)
      .where("id", entity.id)
      .update(entity);
  }

  protected async delete(id: number): Promise<void> {
    return this.connection(this.tableName).where("id", id).delete();
  }
}
