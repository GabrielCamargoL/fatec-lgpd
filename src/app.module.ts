import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
