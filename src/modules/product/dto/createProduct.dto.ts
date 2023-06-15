import { IsNotEmpty, IsNumber, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string

	@IsNotEmpty({ message: 'O nome não pode ser vazio.' })
	@IsNumber()
	@ApiProperty()
	price: number

	@IsNumber()
	@ApiProperty()
	quantity: number

	@ApiProperty()
	category: string
}
