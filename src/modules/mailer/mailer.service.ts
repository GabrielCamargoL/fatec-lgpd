import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmail(email:string, mensage:string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'joaom.fatec@gmail.com',
      subject: "Hello",
      html:mensage
    });
  }
}