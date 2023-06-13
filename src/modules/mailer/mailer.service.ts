import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmail(email:string, mensage:string) {
    await this.mailerService.sendMail({
      to: email,
      from: '<email autorizado no mailgun>',
      subject: "Hello",
      template: "alert"
    });
  }
}