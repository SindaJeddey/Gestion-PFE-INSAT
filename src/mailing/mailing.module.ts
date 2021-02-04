import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailingService } from './mailing.service';
import * as dotenv from 'dotenv';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

dotenv.config();
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          ignoreTLS: true,
          secure: false,
          auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASSWORD,
          },
        },
        defaults: {
          from: 'No-Reply <devure@insat.com>',
        },
      }),
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
