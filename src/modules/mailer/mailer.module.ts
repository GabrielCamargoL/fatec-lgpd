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
          user: 'postmaster@sandboxf996b20f32d54080a822c18cd841911d.mailgun.org',
          pass: '798264ef20a23c0b41cbba5f412cbeae-5d9bd83c-9bb58cd6',
        },
        ignoreTLS: true,
      },
      defaults: { // configurações que podem ser padrões
        from: '"',
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}