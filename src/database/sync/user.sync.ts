import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaClientMongo } from '@prisma-mongo/prisma/client';

const prisma = new PrismaClient();
const prismaMongo = new PrismaClientMongo();

async function main() {
	dotenv.config();

	const allUsers = await prismaMongo.deletedUsers.findMany();

	for (const userDeleted of allUsers) {
		try {
			await prisma.user.delete({
				where: {
					id: userDeleted.userId,
				},
			});
		} catch {
			continue;
		}
	}
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
		await prismaMongo.$disconnect();
	});
