import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeofEntityEnum } from '../file/file.service';

export class CreateLikeCarDto{
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  announcementId:number

  @ApiProperty({ enum:TypeofEntityEnum })
  @IsEnum(TypeofEntityEnum)
  @IsNotEmpty()
  kind:TypeofEntityEnum
}
