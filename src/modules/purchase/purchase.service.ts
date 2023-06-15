import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductService } from '../product/product.service';


@Injectable()
export class PurchaseService {
	constructor(private readonly prismaService: PrismaService, private readonly productService: ProductService) { }

	findAll() {
		return this.prismaService.purchase.findMany();
	}

	async findById(id: number) {
		try {
			const purchase = await this.prismaService.purchase.findUniqueOrThrow({
				where: {
					id,
				},
			});

			return purchase;

		} catch (error) {
			throw new NotFoundException('Compra não encontrada');
		}
	}

	async create(purchase: any) {
		purchase['status'] = 'pending';
		purchase['totalAmount'] = 0.0

		for (const productId of purchase.products) {
			const productFound = await this.productService.findById(productId);
			purchase['totalAmount'] = purchase['totalAmount'] + productFound.price
		}


		return await this.prismaService.purchase.create({
			data: purchase,
		});
	}
}
