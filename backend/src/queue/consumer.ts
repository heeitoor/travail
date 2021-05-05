import { TravailQueue } from "src/shared/rabbitmq";

interface QueueConsumer {
  handle(message: any): void;
}

abstract class QueueConsumerBase<T> implements QueueConsumer {
  abstract get queue(): TravailQueue;

  abstract handle(message: T): void;
}

export { QueueConsumer, QueueConsumerBase };
