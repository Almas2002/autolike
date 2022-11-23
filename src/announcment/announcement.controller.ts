import { Body, Controller, Get, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, FilterAnnouncementQuery } from './announcement.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DriveIUnitEnum, Wheel } from './entities/car/car-about.entity';
import { MototehnikaService } from '../mototehnika/service/mototehnika.service';
import { FilterMototehnikaQuery } from '../mototehnika/dto/mototehnika.dto';

@ApiTags('обьявление')
@Controller('announcement')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService, private motoService: MototehnikaService) {
  }

  @ApiImplicitFile({ name: 'file', description: 'фото для машины' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @UseGuards(AuthGuard)
  @Post()
  create(@Body()dto: CreateAnnouncementDto, @UserDecorator('id')id: number, @UploadedFiles()files: { file: any[] }) {
    return this.announcementService.create(dto, id, files.file);
  }

  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'priceFrom', example: 10, required: false })
  @ApiQuery({ name: 'priceTo', example: 10, required: false })
  @ApiQuery({ name: 'mileageFrom', example: 10, required: false })
  @ApiQuery({ name: 'mileageTo', example: 10, required: false })
  @ApiQuery({ name: 'steeringWheel', example: Wheel.LEFT, required: false, enum: Wheel })
  @ApiQuery({ name: 'yearFrom', example: 10, required: false })
  @ApiQuery({ name: 'yearTo', example: 10, required: false })
  @ApiQuery({ name: 'marks', example: '1,2,3', required: false })
  @ApiQuery({ name: 'models', example: '1,3,4', required: false })
  @ApiQuery({ name: 'generations', example: 10, required: false })
  @ApiQuery({ name: 'bodyTypeId', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'volumeFrom', example: 3.5, required: false })
  @ApiQuery({ name: 'volumeTo', example: 5.4, required: false })
  @ApiQuery({ name: 'cities', example: '1,2,3', required: false })
  @ApiQuery({ name: 'transmission', example: 1, required: false })
  @ApiQuery({ name: 'driveUnit', example: DriveIUnitEnum.FOURWHELL, required: false, enum: DriveIUnitEnum })
  @ApiQuery({ name: 'orderByPriceDESC', example: true, required: false })
  @ApiQuery({ name: 'orderByPriceASC', example: true, required: false })
  @ApiQuery({ name: 'orderByLikesASC', example: true, required: false })
  @Get()
  list(@Query()query: FilterAnnouncementQuery, @Req() req) {
    return this.announcementService.list(query, req.user?.id);
  }
  @ApiQuery({ name: 'yearFrom', example: 10, required: false })
  @ApiQuery({ name: 'yearTo', example: 10, required: false })
  @ApiQuery({ name: 'types', example: '1,2,3', required: false })
  @ApiQuery({ name: 'cities', example: '1,2,3', required: false })
  @ApiQuery({ name: 'orderByPriceDESC', example: true, required: false })
  @ApiQuery({ name: 'orderByPriceASC', example: true, required: false })
  @ApiQuery({ name: 'orderByLikesASC', example: true, required: false })
  @ApiQuery({ name: 'marks', example: '1,2,3', required: false })
  @ApiQuery({ name: 'priceFrom', example: 10, required: false })
  @ApiQuery({ name: 'priceTo', example: 10, required: false })
  @Get('moto')
  motoList(@Query()dto: FilterMototehnikaQuery, @Req()req) {
    return this.motoService.list(dto, req.user?.id);
  }
}