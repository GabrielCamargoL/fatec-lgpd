import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAILGUN, //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: { //dados do usuário e senha
          user: process.env.USER_MAILGUN,
          pass: process.env.PASSWORD_MAILGUN,
        },
        ignoreTLS: true,
      },
      defaults: { // configurações que podem ser padrões
        from: '"',
      }
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}