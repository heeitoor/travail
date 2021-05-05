import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { UserController } from './controllers/user.controller';
import { UserRecoverRepository } from './repositories/user-recover.repository';
import { UserRepository } from './repositories/user.repository';
import { WorkRepository } from './repositories/work.repository';
import { UserService } from './services/user/user.service';
import { WorkService } from './services/work/work.service';
import { MailService } from './shared/mail';
import { HealthController } from './controllers/health.controller';
import { HttpExceptionFilter } from './shared/exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { SignOnConsumer } from './queue/signon-consumer';
import { SecurityMiddleware } from '././middlewares/security.middleware';
import { RedisService } from './shared/redis';
import { WorkTypeController } from './controllers/work-type.controller';
import { WorkTypeService } from './services/work-type/work-type.service';
import { WorkTypeRepository } from './repositories/work-type.repository';
import { appConfig } from './app.config';
import { UserWorkTypeRepository } from './repositories/user-work-type.repository';

const services = [UserService, WorkService, WorkTypeService];
const repositories = [
  UserRepository,
  UserRecoverRepository,
  WorkRepository,
  WorkTypeRepository,
  UserWorkTypeRepository,
];
const consumers = [SignOnConsumer];
const commonService = [MailService, RedisService];

@Module({
  imports: [TerminusModule],
  controllers: [AppController, UserController, HealthController, WorkTypeController],
  providers: [
    ...commonService,
    ...services,
    ...repositories,
    ...consumers,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    WorkTypeService,
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    if (appConfig.NODE_ENV !== 'development') {
      consumer
        .apply(SecurityMiddleware)
        .exclude(
          { path: 'api/user/login', method: RequestMethod.POST },
          { path: '/api/health', method: RequestMethod.GET }
        )
        .forRoutes({
          path: '*',
          method: RequestMethod.ALL,
        });
    }
  }
}
