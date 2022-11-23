import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Filter } from '../../interface/filter';

export class CreateModelDto {
  @ApiProperty({description:"название модели",example:"Camry"})
  @IsString({message:"название должно быть стракой"})
  @IsNotEmpty({message:"название не должно быть пустым"})
  title: string;
  @ApiProperty({description:"id марки",example:1})
  @IsInt({message:"айдишка марки должно быть цифрой"})
  @IsNotEmpty({message:"айдишка марки не должно быть пустым"})
  markaId:number

  @ApiProperty({description:"id марки",example:1})
  @IsInt({message:"айдишка кузова должно быть цифрой"})
  @IsNotEmpty({message:"айдишка кузова не должно быть пустой"})
  bodyTypeId:number
}

export class FilterModelListQuery extends Filter{
  title: string;
  markaId:number
}