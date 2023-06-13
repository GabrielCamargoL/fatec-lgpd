import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';

import { EmailIsUniqueValidator } from './validation/email-is-unique.validator';
import { UserService } from './user.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { PrismaMongoModule } from 'src/database/prisma/mongo/prisma.mongo.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [PrismaModule, PrismaMongoModule, forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService, EmailIsUniqueValidator],
	exports: [UserService],
})
export class UserModule {}
