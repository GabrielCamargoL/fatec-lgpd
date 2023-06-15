import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';

const saltOrRounds = 10;

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) { }

	findAll() {
		return this.prismaService.product.findMany();
	}

	async findById(id: number) {
		try {
			const product = await this.prismaService.product.findUniqueOrThrow({
				where: {
					id,
				},
			});

			return product;

		} catch (error) {
			throw new NotFoundException('Usuário não encontrado');
		}
	}

	async create(product: CreateProductDTO) {
		return await this.prismaService.product.create({
			data: product,
		});
	}

	async update(product: UpdateProductDTO, id: number) {
		const productUpdated = await this.prismaService.product.update({
			data: product,
			where: {
				id,
			},
		});

		return productUpdated;
	}

	async delete(id: number) {
		await this.prismaService.product.delete({
			where: {
				id: id,
			},
		});
	}
}
