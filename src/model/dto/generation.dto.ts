import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenerationDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title:string;
  @ApiProperty()
  @IsNotEmpty()
  modelId:number;
  @ApiProperty()
  @IsNotEmpty()
  createdFrom:number;
  @ApiProperty()
  createdTo:number
}

export class CreateTransmissionDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title:string;
}