import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { Prisma } from '@prisma/client';
import { PrismaServiceMongo } from 'src/database/prisma/mongo/prisma.mongo.service';
import { MailerService } from '@nestjs-modules/mailer';

const saltOrRounds = 10;

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService, readonly prismaMongoService: PrismaServiceMongo, private mailerService: MailerService) {}

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

		await this.mailerService.sendMail({
			to: 'joao.jmadr@gmail.com',
			from: 'joaom.fatec@gmail.com',
			html: `<head>
			<meta name="viewport" content="width=device-width" />
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>Alerts e.g. approaching your limit</title>
			<style type="text/css">
			img {
			max-width: 100%;
			}
			body {
			-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
			}
			body {
			background-color: #f6f6f6;
			}
			@media only screen and (max-width: 640px) {
			  body {
				padding: 0 !important;
			  }
			  h1 {
				font-weight: 800 !important; margin: 20px 0 5px !important;
			  }
			  h2 {
				font-weight: 800 !important; margin: 20px 0 5px !important;
			  }
			  h3 {
				font-weight: 800 !important; margin: 20px 0 5px !important;
			  }
			  h4 {
				font-weight: 800 !important; margin: 20px 0 5px !important;
			  }
			  h1 {
				font-size: 22px !important;
			  }
			  h2 {
				font-size: 18px !important;
			  }
			  h3 {
				font-size: 16px !important;
			  }
			  .container {
				padding: 0 !important; width: 100% !important;
			  }
			  .content {
				padding: 0 !important;
			  }
			  .content-wrap {
				padding: 10px !important;
			  }
			  .invoice {
				width: 100% !important;
			  }
			}
			</style>
			</head>
			
			<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
			
			<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
				<td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
				  <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
					<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #FF9F00; margin: 0; padding: 20px;" align="center" bgcolor="#FF9F00" valign="top">
						  Sua conta foi Deletada!
						</td>
					  </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
						  <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">	
							  </td>`
		}); 
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
