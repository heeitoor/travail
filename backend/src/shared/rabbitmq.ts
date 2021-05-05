import { connect, Options } from 'amqplib';
import { appConfig } from 'src/app.config';
import { QueueConsumerBase } from 'src/queue/consumer';

class RabbitMQHelper {
  private static assertOptions: Options.AssertQueue = { durable: false };
  private static consumeOptions: Options.Consume = { noAck: true };

  constructor() {}

  static async startConsumers(consumers: QueueConsumerBase<any>[]) {
    const connection = await connect(appConfig.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    for (const consumer of consumers) {
      const { queue } = consumer;

      await channel.assertQueue(queue, this.assertOptions);

      channel.consume(
        queue,
        ({ content }) => {
          const { payload } = JSON.parse(content.toString());
          consumer.handle(payload);
        },
        this.consumeOptions
      );
    }
  }

  static async publish(queueMessage: QueueMessage<any>) {
    const connection = await connect(appConfig.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueMessage.queue, this.assertOptions);

    await channel.sendToQueue(
      queueMessage.queue,
      Buffer.from(JSON.stringify(queueMessage))
    );

    await channel.close();
    await connection.close();
  }
}

enum TravailQueue {
  INTERNAL = 'INTERNAL',
  SIGNON = 'SIGNON',
}

interface QueueMessageBase {
  queue: TravailQueue;
}

interface QueueMessage<T> extends QueueMessageBase {
  payload: T;
}

export { RabbitMQHelper, TravailQueue, QueueMessage };
