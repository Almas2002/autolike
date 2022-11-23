import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BoatTypeDto{
  @ApiProperty({example:"катер",description:"тип техники"})
  @IsNotEmpty()
  title:string;
}