import { DescriptionService } from '../service/description.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDescriptionDto, CreateDescriptionTagsDto } from '../dto/description.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'remove tag' })
  @ApiResponse({ status: 200 })
  @Delete("description/:id")
  removeTag(@Param('id')id:number){
    return this.descriptionService.removeTag(id)
  }
  @ApiOperation({ summary: 'remove description to tag' })
  @ApiResponse({ status: 200 })
  @Delete("tag/:id")
  removeDescription(@Param('id')id:number){
    return this.descriptionService.removeDescription(id)
  }
}