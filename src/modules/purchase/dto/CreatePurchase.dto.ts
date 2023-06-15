import { IsNotEmpty, IsNumber, IsOptional, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class CreatePurchaseDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	userId: string;

	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	products: string[]

	@IsOptional()
	@ApiProperty()
	status: string
}
