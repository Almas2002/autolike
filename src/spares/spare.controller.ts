import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SpareService } from './spare.service';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateSpateDto, FilterShapeQuery } from './spate.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Запчасти')
@Controller('spare')
export class SpareController {
  constructor(private spareService: SpareService) {
  }

  @ApiImplicitFile({ name: 'file', description: 'фото для машины' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body()dto: CreateSpateDto, @UserDecorator('id')id: number, @UploadedFiles()files: { file: any[] }) {
    return this.spareService.create(dto, id, files.file);
  }

  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'priceFrom', example: 10, required: false })
  @ApiQuery({ name: 'priceTo', example: 10, required: false })
  @ApiQuery({ name: 'marks', example: '1,2,3', required: false })
  @ApiQuery({ name: 'models', example: '1,3,4', required: false })
  @ApiQuery({ name: 'generations', example: '1,,2', required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'cities', example: '1,2,3', required: false })
  @ApiQuery({ name: 'title', example: 'Матор', required: false })
  @ApiQuery({ name: 'orderByPriceDESC', example: true, required: false })
  @ApiQuery({ name: 'orderByPriceASC', example: true, required: false })
  @ApiQuery({ name: 'orderByLikesASC', example: true, required: false })
  @Get()
  list(@Query()query: FilterShapeQuery, @Req() req) {
    return this.spareService.getList(query, req.user?.id);
  }

  @Get(':id')
  getOne(@Param('id')id: number) {
    return this.spareService.getOne(id);
  }
}