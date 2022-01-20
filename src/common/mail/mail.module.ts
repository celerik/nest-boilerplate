/** @packages */
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

/** @application */
import {
  mailFrom,
  mailHost,
  mailPassword,
  mailPort,
  mailUser,
} from '@base/environments';

/** @module */
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      async useFactory() {
        return {
          transport: {
            host: mailHost,
            port: mailPort,
            secure: false,
            requireTLC: true,
            auth: {
              user: mailUser,
              pass: mailPassword,
            },
          },
          defaults: {
            from: `"No Reply" <${mailFrom}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
