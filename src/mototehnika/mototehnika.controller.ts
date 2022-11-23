import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMarkaDto } from '../model/dto/marka.dto';
import { TypeMototehnikaService } from './service/type-mototehnika.service';
import { CreateTypeMotoDto } from '../model/dto/type-moto.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TypeOfMototechnics } from './typeOfMototechnics.entity';
import { MototehniksMark } from './mototehniks-mark.entity';

@ApiTags('mototehnika')
@Controller('mototehnika')
export class MototehnikaController {
  constructor(private motoService: TypeMototehnikaService) {
  }

  @Post('marka')
  async createMark(@Body()dto: CreateMarkaDto) {
    return this.motoService.createMark(dto);
  }

  @Post('types')
  async createType(@Body()dto: CreateTypeMotoDto) {
    return this.motoService.createType(dto);
  }
  @ApiOkResponse({type:[TypeOfMototechnics]})
  @Get('types')
  async getTypes() {
    return this.motoService.getTypes();
  }
  @ApiOkResponse({type:[MototehniksMark]})
  @Get('marka')
  async getMarka() {
    return this.motoService.getMarks();
  }

}