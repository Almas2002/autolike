import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoatDto {
  @ApiProperty({ example: 1, description: 'id of city' })
  @IsNotEmpty()
  cityId: number;
  @ApiProperty({ example: 1, description: 'if of type' })
  @IsNotEmpty()
  typeId: number;
  @ApiProperty({ example: 'что то', description: 'описание катера' })
  @IsNotEmpty()
  description: string;
  @ApiProperty({ example: 1000000, description: 'цена катера' })
  @IsNotEmpty()
  price: number;
}