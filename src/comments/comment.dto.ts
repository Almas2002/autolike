import { Filter } from '../interface/filter';
import { IsEmpty, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeofEntityEnum } from '../file/file.service';

export class CreateCommentDto {
  @ApiProperty({ description: 'id коментарий на который хотите ответить', example: '1', required: false })
  @IsInt()
  @IsEmpty()
  parentCommentId: number;
  @ApiProperty({ description: 'id обьявление', example: '1', required: false })
  @IsInt()
  @IsEmpty()
  announcementId: number;
  @ApiProperty({ description: 'текст коментарий ', example: 'ахуенная тачка' })
  @IsString()
  @IsNotEmpty()
  text: string;
  @ApiProperty({ enum:TypeofEntityEnum })
  @IsEnum(TypeofEntityEnum)
  @IsNotEmpty()
  kind:TypeofEntityEnum
}

export class FilterCommentsQuery extends Filter {
  parentId: number;
  carId: number;
  motoId: number;
  shapeId: number;
}