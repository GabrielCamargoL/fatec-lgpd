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
          user: 'postmaster@sandboxc0c61535f6204bc8ac6893aa8caf370f.mailgun.org',
          pass: '22467142ecb100e9f252b0f4287b4dbe-af778b4b-f9469e0a',
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