import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegionService } from './region.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRegionDto } from './dto/region.dto';
import { CreateCityDto } from './dto/city.dto';
import { Region } from './entity/region.entity';

@ApiTags('регион')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {
  }

  @Post()
  createRegion(@Body()dto: CreateRegionDto): Promise<{ id: number }> {
    return this.regionService.createRegion(dto);
  }

  @Post('city')
  createCity(@Body()dto: CreateCityDto): Promise<{ id: number }> {
    return this.regionService.createCity(dto);
  }

  @Get()
  getListRegionsWithCity(): Promise<Region[]> {
    return this.regionService.getRegions();
  }
}