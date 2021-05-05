import * as sendgrid from "@sendgrid/mail";
import { appConfig } from "src/app.config";

class MailService {
  constructor() {}

  async send(mailMessage: MailMessage) {
    sendgrid.setApiKey(appConfig.SENDGRID_KEY);

    const { to, subject, content } = mailMessage;
    const from = appConfig.SENDGRID_DEFAULT_SENDER;

    await sendgrid.send({ from, to, subject, html: content });
  }
}

interface MailMessage {
  to: string;
  subject: string;
  content: string;
}

export { MailService, MailMessage };
