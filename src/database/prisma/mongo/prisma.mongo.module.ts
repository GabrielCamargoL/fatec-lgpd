import { Module } from '@nestjs/common';
import { PrismaServiceMongo } from './prisma.mongo.service';

@Module({
	providers: [PrismaServiceMongo],
	exports: [PrismaServiceMongo],
})
export class PrismaMongoModule {}
