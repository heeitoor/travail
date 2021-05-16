import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
import { connect } from 'amqplib';
import knex from 'knex';
import { appConfig, KnexConfig } from 'src/app.config';
import * as knexConfig from '../../../knexfile';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  @Get()
  @HealthCheck()
  healthcheck() {
    return this.health.check([
      () => {
        return new Promise<HealthIndicatorResult>(async (res, rej) => {
          let item: HealthIndicatorResult = {
            database: { status: 'down' },
            rabbitmq: { status: 'down' },
          };

          try {
            const config = knexConfig as KnexConfig;

            const { id } = await knex(config[appConfig.NODE_ENV]).from<any>('knex_migrations').select(['id']).first();

            if (id) {
              item['database'].status = 'up';
            }
          } catch (error) {}

          try {
            const { connection } = await connect(appConfig.CLOUDAMQP_URL);

            //@ts-ignore
            const authorized = connection?.stream?.authorized;

            if (authorized && authorized === true) {
              item['rabbitmq'].status = 'up';

              // @ts-ignore
              connection.close();
            }
          } catch (error) {}

          res(item);
        });
      },
    ]);
  }
}
