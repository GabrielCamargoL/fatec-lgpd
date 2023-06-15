import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { productModule } from '../product/product.module';

@Module({
	imports: [PrismaModule, productModule],
	controllers: [PurchaseController],
	providers: [PurchaseService],
	exports: [PurchaseService],
})
export class PurchaseModule { }
