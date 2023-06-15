import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: { //dados do usuário e senha
          user: 'postmaster@sandboxa9d6ddbf0bf248b88d53fb005c699239.mailgun.org',
          pass: '0256c9e764500285703605000e3b1d13-af778b4b-7d50a1b5',
        },
        ignoreTLS: true,
      },
      defaults: { // configurações que podem ser padrões
        from: '"',
      },
      template:{
        options:{
          name:'alert'
        }
      }
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}