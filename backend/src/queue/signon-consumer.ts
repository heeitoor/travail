import { Injectable } from '@nestjs/common';
import { appConfig } from 'src/app.config';
import { MailService } from 'src/shared/mail';
import { TravailQueue } from 'src/shared/rabbitmq';
import { QueueConsumerBase } from './consumer';

@Injectable()
class SignOnConsumer extends QueueConsumerBase<SignOnMessage> {
  constructor() {
    super();
  }

  get queue(): TravailQueue {
    return TravailQueue.SIGNON;
  }

  async handle(payload: SignOnMessage): Promise<void> {
    const { userName, userEmail, confirmationCode } = payload;

    await MailService.sendSignOnMail({
      to: userEmail,
      dynamicTemplateData: {
        subject: 'Bem vindo! Confirme sua conta',
        customerName: userName,
        activationUrl: `${appConfig.WEB_URL}/auth/confirm/${confirmationCode}`,
      },
    });
  }
}

interface SignOnMessage {
  userId: number;
  userName: string;
  userEmail: string;
  confirmationCode: string;
}

export { SignOnConsumer, SignOnMessage };
