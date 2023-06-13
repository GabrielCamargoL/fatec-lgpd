import { Controller, Get, Post, Render, Request } from '@nestjs/common';
import { MailService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/mail')
@ApiTags('mailer')
export class MailerController {
	constructor(private readonly mailerService: MailService) { }

	@Post('send-email')
	enviarEmail(@Request() req) {
		console.log(req.body.email);
		console.log(req.body.mensagem);
		return this.mailerService.enviarEmail(
			req.body.email,
			req.body.mensagem,
		);
	}
}
