import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mailer/mailer.module';
import { productModule } from './modules/product/product.module';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		MailModule,
		productModule,
		PurchaseModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
