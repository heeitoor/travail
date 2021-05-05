import { Module } from "@nestjs/common";
import { TerminusModule, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { AppController } from "./app.controller";
import { ServiceController } from "./controllers/service/service.controller";
import { UserController } from "./controllers/user/user.controller";
import { UserRecoverRepository } from "./repositories/user-recover.repository";
import { UserRepository } from "./repositories/user.repository";
import { WorkRepository } from "./repositories/work.repository";
import { UserService } from "./services/user/user.service";
import { WorkService } from "./services/work/work.service";
import { MailService } from "./shared/mail";
import { HealthController } from './controllers/health/health.controller';

const services = [UserService, WorkService];
const repositories = [UserRepository, UserRecoverRepository, WorkRepository];

@Module({
  imports: [TerminusModule],
  controllers: [AppController, ServiceController, UserController, HealthController],
  providers: [...services, ...repositories, MailService],
})
export class AppModule {}
