import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { appConfig } from 'src/app.config';

@Injectable()
class MailService {
  constructor() {}

  static async sendSignOnMail(signOnMessage: SignOnMessage) {
    sendgrid.setApiKey(appConfig.SENDGRID_KEY);

    const from = appConfig.SENDGRID_DEFAULT_SENDER;

    await sendgrid.send({
      to: signOnMessage.to,
      from,
      templateId: 'd-c3f4eb7f6dda4a1fb34ef604bfeb2b8b',
      dynamicTemplateData: signOnMessage.dynamicTemplateData,
    });
  }
}

interface MailMessage {
  to: string;
}

interface SignOnMessageTemplate {
  subject: string;
  customerName: string;
  activationUrl: string;
}

interface SignOnMessage extends MailMessage {
  dynamicTemplateData: SignOnMessageTemplate;
}

export { MailService, MailMessage, SignOnMessage };
