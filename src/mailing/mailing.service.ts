import { BadGatewayException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  public async sendEmail(to: string, subject: string, content: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text: content,
      });
    } catch (e) {
      console.log(e);
      throw new BadGatewayException('Email send failed');
    }
  }
}
