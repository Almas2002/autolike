import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto{
  @ApiProperty()
  @IsNotEmpty()
  title:string;
  @IsNotEmpty()
  @ApiProperty()
  text:string
}