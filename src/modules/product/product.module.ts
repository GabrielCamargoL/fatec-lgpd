import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PrismaMongoModule } from 'src/database/prisma/mongo/prisma.mongo.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	imports: [PrismaModule, PrismaMongoModule],
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService],
})
export class productModule { }
