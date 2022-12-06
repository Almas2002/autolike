import { DriveIUnitEnum, StatementEnum, Wheel } from './entities/car/car-about.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Filter } from '../interface/filter';

export class CreateAnnouncementDto{
  @ApiProperty({example:2020,description:"год машины"})
  @IsNotEmpty()
  year:number;
  @ApiProperty({example:3.5,description:"обьем машины"})
  @IsNotEmpty()
  volume:number;
  @ApiProperty({example:10000,description:"пробег машины"})
  @IsNotEmpty()
  mileage:number
  @ApiProperty({example:10000,description:"цена машины"})
  @IsNotEmpty()
  price:number
  @ApiProperty({example:"хорошая машина",description:"описание машины"})
  @IsNotEmpty()
  description:string
  @ApiProperty({example:"1,2,3",description:"id tags"})
  tags:string
  @ApiProperty({enum:Wheel})
  @IsEnum(Wheel)
  @IsNotEmpty()
  steeringWheel: Wheel
  @ApiProperty({example:1,description:"id марки"})
  @IsNotEmpty()
  markaId:number;
  @ApiProperty({example:1,description:"id модели"})
  @IsNotEmpty()
  modelId:number;
  @ApiProperty({example:1,description:"id поколений"})
  @IsNotEmpty()
  generationId:number;
  @ApiProperty({example:1,description:"id кузова"})
  @IsNotEmpty()
  bodyTypeId:number;
  @ApiProperty({example:1,description:"id city"})
  @IsNotEmpty()
  cityId:number;
  @ApiProperty({enum:StatementEnum})
  @IsEnum(StatementEnum)
  @IsNotEmpty()
  state:StatementEnum;
  @ApiProperty({example:1,description:"id transmission"})
  @IsNotEmpty()
  transmissionId: number;
  @ApiProperty({enum:DriveIUnitEnum})
  @IsEnum(DriveIUnitEnum)
  @IsNotEmpty()
  driveUnit: DriveIUnitEnum;
  @ApiProperty({example:true,description:"растаможка",required:false})
  //разтарможка
  customsClearance:boolean
}

export class FilterAnnouncementQuery extends Filter{
  priceFrom:number;
  volumeTo:number;
  volumeFrom:number;
  priceTo:number;
  mileageFrom:number;
  mileageTo:number;
  steeringWheel: Wheel;
  yearFrom:number;
  yearTo:number;
  marks:string;
  models:string;
  generations:string;
  bodyTypeId:number;
  cities:string
  transmission: number;
  driveUnit: DriveIUnitEnum;
  orderByPriceDESC:boolean
  orderByPriceASC:boolean
  orderByLikesDESC:boolean
}

export class CreateTypeAuto{
  @ApiProperty({example:"",description:" type"})
  @IsNotEmpty()
  title:string
}