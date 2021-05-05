import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { ServiceController } from './controllers/service/service.controller';
import { UserController } from './controllers/user/user.controller';
import { UserRecoverRepository } from './repositories/user-recover.repository';
import { UserRepository } from './repositories/user.repository';
import { WorkRepository } from './repositories/work.repository';
import { UserService } from './services/user/user.service';
import { WorkService } from './services/work/work.service';
import { MailService } from './shared/mail';
import { HealthController } from './controllers/health/health.controller';
import { HttpExceptionFilter } from './shared/exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { SignOnConsumer } from './queue/signon-consumer';

const services = [UserService, WorkService];
const repositories = [UserRepository, UserRecoverRepository, WorkRepository];
const consumers = [SignOnConsumer];

@Module({
  imports: [TerminusModule],
  controllers: [
    AppController,
    ServiceController,
    UserController,
    HealthController,
  ],
  providers: [
    MailService,
    ...services,
    ...repositories,
    ...consumers,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
