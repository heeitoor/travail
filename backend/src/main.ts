import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RabbitMQHelper, TravailQueue } from './shared/rabbitmq';
import { SignOnConsumer } from './queue/signon-consumer';
import { CrobJobSchedule, CronWorker } from './workers/cron-worker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Travail')
    .setDescription('Travail API')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);

  RabbitMQHelper.startConsumers([{ queue: TravailQueue.SIGNON, handle: app.get(SignOnConsumer).handle }]);

  CronWorker.startJobs([
    {
      name: 'Job Test',
      schedule: CrobJobSchedule.everyMinute,
      handle: () => console.info('Job is executing successfully!'),
    },
  ]);
}

bootstrap();
