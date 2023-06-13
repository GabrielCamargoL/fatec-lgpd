import {
	Request,
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { AuthService } from '../auth/auth.service';
import { Prisma, User } from '@prisma/client';

@Controller('/users')
@ApiTags('users')
export class UserController {
	constructor(
		private userService: UserService,
		@Inject(forwardRef(() => AuthService))
		private authService: AuthService,
	) {}

	@Post()
	async CreateUser(@Body() userData: CreateUserDTO) {
		const createdUser: Partial<Prisma.UserWhereInput> = await this.userService.create(userData);

		const user = { email: userData.email, password: userData.password };
		const userLogged = await this.authService.login(user);

		delete createdUser.cpf;
		delete createdUser.password;
		delete createdUser.phoneNumber;

		return {
			user: createdUser,
			token: userLogged.token,
		};
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	async index() {
		const users = this.userService.findAll();
		return users;
	}

	@Get('/search')
	@UseGuards(AuthGuard('jwt'))
	async usersByName(@Query('name') name: string) {
		if (name === null || name === undefined) return this.userService.findAll();

		return this.userService.findByName(name);
	}

	@Get('/:id')
	@UseGuards(AuthGuard('jwt'))
	async show(@Request() req, @Param('id') id: string) {
		const user = await this.userService.findById(id);
		if (user.id !== req.user.id) {
			delete user.cpf;
			delete user.password;
			delete user.phoneNumber;
		}

		return user;
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
		const userUpdated = await this.userService.update(dataToUpdate, id);
		return {
			user: userUpdated,
			message: 'Usuário Atualizado com sucesso.',
		};
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteUser(@Param('id') id: string) {
		const userFound = await this.userService.findById(id);
		if (userFound === null) throw new NotFoundException('Usuário não encontrado.');

		await this.userService.delete(id);
		this.userService.insertIdOnDeletedUsersList(id);
		return { message: 'Usuário deletado com sucesso.' };
	}
}
