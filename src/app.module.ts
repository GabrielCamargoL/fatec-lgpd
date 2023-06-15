import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mailer/mailer.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		MailModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
