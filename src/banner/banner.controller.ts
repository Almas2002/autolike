import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Filter } from '../interface/filter';
import { Banner } from './banner.entity';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('баннер')
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {
  }
  @ApiImplicitFile({ name: 'file', description: 'фото для банера' })
  @ApiResponse({
    status: 201, schema: {
      oneOf: [
        {
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
          },
        },
      ],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body()dto: CreateBannerDto, @UploadedFile('file') file: any) {
    return this.bannerService.create(dto, file);
  }

  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOkResponse({type:[Banner]})
  @Get()
  getBanners(@Query()query: Filter) {
    return this.bannerService.get(query);
  }


}