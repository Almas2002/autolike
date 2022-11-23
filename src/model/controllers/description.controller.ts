import { DescriptionService } from '../service/description.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDescriptionDto, CreateDescriptionTagsDto } from '../dto/description.dto';

@Controller('description')
export class DescriptionController {
  constructor(private descriptionService: DescriptionService) {
  }


  @Post()
  createDescription(@Body()dto: CreateDescriptionDto) {
    return this.descriptionService.createDescription(dto);
  }

  @Post('tags')
  createTags(@Body()dto: CreateDescriptionTagsDto) {
    return this.descriptionService.createTag(dto);
  }

  @Get()
  getList() {
    return this.descriptionService.getDescriptionList();
  }
}