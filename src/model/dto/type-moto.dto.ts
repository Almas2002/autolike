import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTypeMotoDto {
  @ApiProperty({example:"мопед",description:"типы мототехники"})
  @IsNotEmpty()
  title: string;
}