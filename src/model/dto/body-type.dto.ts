import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBodyTypeDto{
   @ApiProperty({example:"Седан",description:"название кузова"})
   @IsString()
   @IsNotEmpty()
   title:string

}