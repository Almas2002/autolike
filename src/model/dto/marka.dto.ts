import { IsNotEmpty, IsString } from 'class-validator';
import { Filter } from '../../interface/filter';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkaDto{
  @ApiProperty({example:"Toyota",description:"marka for car"})
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class FilterMarkaListQuery extends Filter{
  title:string
}