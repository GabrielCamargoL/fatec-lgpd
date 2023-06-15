import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { Prisma } from '@prisma/client';

@Controller('/products')
@ApiTags('products')
export class ProductController {
	constructor(private productService: ProductService,) { }

	@Post()
	async CreateProduct(@Body() productData: CreateProductDTO) {
		const createdproduct = await this.productService.create(productData);
		return createdproduct;
	}

	@Get()
	async index() {
		const products: Prisma.ProductWhereInput[] = await this.productService.findAll();
		return products;
	}

	@Get('/:id')
	async show(@Param('id') id: number): Promise<Prisma.ProductWhereInput> {
		const product: Prisma.ProductWhereInput = await this.productService.findById(id);

		if (!product) throw new NotFoundException('Usuário não encontrado');
		return product;
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateProduct(@Param('id') id: number, @Body() dataToUpdate: CreateProductDTO) {
		const productUpdated = await this.productService.update(dataToUpdate, id);
		return {
			product: productUpdated,
			message: 'Produto Atualizado com sucesso.',
		};
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteProduct(@Param('id') id: number) {
		const productFound = await this.productService.findById(id);
		if (!productFound) throw new NotFoundException('Produto não encontrado.');

		await this.productService.delete(id);
		return { message: 'Produto deletado com sucesso.' };
	}
}
