import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreatePurchaseDTO } from './dto/CreatePurchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('/purchases')
@ApiTags('purchases')
export class PurchaseController {
	constructor(private purchaseService: PurchaseService) { }

	@Post()
	async CreatePurchase(@Body() PurchaseData: CreatePurchaseDTO) {
		const createdPurchase = await this.purchaseService.create(PurchaseData);
		return createdPurchase;
	}

	@Get()
	async index() {
		const Purchases: Prisma.PurchaseWhereInput[] = await this.purchaseService.findAll();
		return Purchases;
	}

	@Get('/:id')
	async show(@Param('id') id: number): Promise<Prisma.PurchaseWhereInput> {
		const Purchase: Prisma.PurchaseWhereInput = await this.purchaseService.findById(id);

		if (!Purchase) throw new NotFoundException('Usuário não encontrado');
		return Purchase;
	}

	@Get('/:userId')
	async findPerUser(@Param('userId') userId: string) {
		const Purchases: Prisma.PurchaseWhereInput[] = await this.purchaseService.findAll();
		return Purchases;
	}
}
