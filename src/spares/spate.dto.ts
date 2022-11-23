import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Filter } from '../interface/filter';

export class CreateSpateDto{
  @ApiProperty({example:1000,description:"цена"})
  @IsNotEmpty()
  price: number;
  @ApiProperty({example:"ахуенный",description:"текст"})
  @IsNotEmpty()
  text: string;
  @ApiProperty({example:"435436345afdsw",description:"текст",required:false})
  code: string;
  @ApiProperty({example:"мотор",description:"id марки"})
  @IsNotEmpty()
  title:string
  @ApiProperty({example:1,description:"id марки"})
  @IsNotEmpty()
  markaId:number;
  @ApiProperty({example:1,description:"id города"})
  @IsNotEmpty()
  cityId:number;
  @ApiProperty({example:1,description:"id модели"})
  @IsNotEmpty()
  modelId:number;
  @ApiProperty({example:1,description:"id поколений"})
  @IsNotEmpty()
  generationId:number;
}

export class FilterShapeQuery extends Filter{
  priceFrom: number;
  priceTo:number
  title:string
  marks:string;
  cities:string;
  models:string;
  generations:string;
  orderByPriceDESC:boolean
  orderByPriceASC:boolean
  orderByLikesDESC:boolean
}