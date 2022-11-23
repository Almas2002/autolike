import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDescriptionDto{
  @ApiProperty({example:"Оптика",description:"название описание"})
  @IsString()
  @IsNotEmpty()
  title:string
}

export class CreateDescriptionTagsDto extends CreateDescriptionDto{
  @ApiProperty({example:1,description:"id"})
  @IsInt()
  @IsNotEmpty()
  descriptionId:number
}