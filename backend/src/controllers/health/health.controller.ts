import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import knex from 'knex';
import { appConfig, KnexConfig } from 'src/app.config';
import * as knexConfig from '../../../knexfile';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      () => {
        return new Promise<HealthIndicatorResult>(async (res, rej) => {
          let item: HealthIndicatorResult = { database: { status: 'down' } };

          try {
            const config = knexConfig as KnexConfig;

            const { id } = await knex(config[appConfig.NODE_ENV])
              .from<any>('knex_migrations')
              .select(['id'])
              .first();

            if (id) {
              item['database'].status = 'up';
            }
          } catch (error) {}

          res(item);
        });
      },
    ]);
  }
}
