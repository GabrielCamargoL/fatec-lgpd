import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { Prisma } from '@prisma/client';
import { PrismaServiceMongo } from 'src/database/prisma/mongo/prisma.mongo.service';
import { MailService } from '../mailer/mailer.service';

const saltOrRounds = 10;

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService, readonly prismaMongoService: PrismaServiceMongo, private readonly mailerService: MailService) {}

	findAll() {
		return this.prismaService.user.findMany();
	}

	async findById(id: string) {
		const user: Partial<Prisma.UserWhereInput> = await this.prismaService.user.findUniqueOrThrow({
			where: {
				id,
			},
		});
		if (user === null) throw new NotFoundException('Usuário não encontrado');

		return user;
	}

	async findByName(name: string) {
		return await this.prismaService.user.findMany({
			where: {
				OR: [
					{
						name: { contains: name, mode: 'insensitive' },
					},
				],
			},
			orderBy: {
				name: 'asc',
			},
		});
	}

	async create(user: CreateUserDTO) {
		const hash = await bcrypt.hash(user.password, saltOrRounds);
		user.password = hash;

		return this.prismaService.user.create({
			data: user,
		});
	}

	async update(user: UpdateUserDTO, id: string) {
		if (user.password) {
			const hash = await bcrypt.hash(user.password, saltOrRounds);
			user.password = hash;
		}

		const userUpdated = this.prismaService.user.update({
			data: user,
			where: {
				id,
			},
		});

		return userUpdated;
	}

	async delete(id: string) {
		await this.prismaService.user.delete({
			where: {
				id: id,
			},
		});

		await this.mailerService.enviarEmail


		 
	}

	async insertIdOnDeletedUsersList(id: string) {
		return await this.prismaMongoService.deletedUsers.create({
			data: {
				userId: id,
			},
		});
	}

	userExists(email: string): boolean {
		const userFound = this.prismaService.user.findUnique({ where: { email: email } });
		return userFound === undefined;
	}

	findUserByEmail(email: string) {
		const userFound = this.prismaService.user.findUnique({ where: { email: email } });

		if (!userFound) throw new NotFoundException('Usuário não encontrado');
		return userFound;
	}
}
