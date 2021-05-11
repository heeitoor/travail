import * as sendgrid from '@sendgrid/mail';
import { appConfig } from 'src/app.config';

class MailService {
  constructor() {}

  async send(mailMessage: MailMessage) {
    sendgrid.setApiKey(appConfig.SENDGRID_KEY);

    const { to, subject, content } = mailMessage;
    const from = appConfig.SENDGRID_DEFAULT_SENDER;

    await sendgrid.send({ from, to, subject, html: content });
  }

  async sendSignOnMail(signOnMessage: SignOnMessage) {
    const from = appConfig.SENDGRID_DEFAULT_SENDER;

    await sendgrid.send({
      to: signOnMessage.to,
      from,
      templateId: 'd-c3f4eb7f6dda4a1fb34ef604bfeb2b8b',
      dynamicTemplateData: signOnMessage.dynamicTemplateData,
    });
  }
}

interface SignOnMessage extends MailMessage {
  dynamicTemplateData: SignOnMessageTemplate;
}

interface SignOnMessageTemplate {
  subject: string;
  customerName: string;
  activationUrl: string;
}

interface MailMessage {
  to: string;
  subject: string;
  content: string;
}

export { MailService, MailMessage, SignOnMessage };
