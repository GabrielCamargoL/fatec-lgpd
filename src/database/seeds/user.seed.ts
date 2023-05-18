import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { users } from './mocks/users';
import { address } from './mocks/address';

const prisma = new PrismaClient();

async function main() {
	dotenv.config();

	for (let userIndex = 0; userIndex < users.length; userIndex++) {
		const user = users[userIndex];

		const hash = await bcrypt.hash(user.password, 10);
		user.password = hash;

		const newUser = await prisma.user.create({ data: users[userIndex] });

		const newAddress = { userId: newUser.id, ...address[userIndex] };
		newAddress.userId = newUser.id;

		await prisma.address.create({ data: newAddress });
	}
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
