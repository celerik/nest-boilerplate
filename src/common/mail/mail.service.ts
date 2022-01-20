/** @packages */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/** @application */
import { appName, appRoute } from '@base/environments';
import { MailDto } from '@common/dtos';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(
    to: string | any,
    subject: string,
    template: string,
    context?: any,
    from?: string | any,
  ) {
    try {
      const sendMail = await this.mailerService.sendMail({
        to,
        from,
        subject,
        template,
        context,
      });
      return !!sendMail;
    } catch (e) {
      return false;
    }
  }

  async sendUserConfirmation(user: MailDto, token: string): Promise<boolean> {
    try {
      const url = `${appRoute}/auth/confirm?token=${token}`;
      const subject = `Welcome to ${appName}! Confirm your Email - ${appName}`;
      const template = './confirmation';
      const to = user.email;
      const context = {
        name: user.name,
        url,
      };
      const sendMail = await this.send(to, subject, template, context);
      return !!sendMail;
    } catch (e) {
      return false;
    }
  }
}
