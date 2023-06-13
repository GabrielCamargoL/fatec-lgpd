import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) { }

	async enviarEmail(email: string, mensage: string) {
		await this.mailerService.sendMail({
			to: email,
			from: process.env.EMAIL_AUTHORIZED,
			subject: "Hello",
			template: "alert"
		});
	}
}
