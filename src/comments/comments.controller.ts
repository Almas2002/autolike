import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, FilterCommentsQuery } from './comment.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("коментарий")
@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}


  @UseGuards(AuthGuard)
  @Post()
  async create(@Body()dto: CreateCommentDto, @UserDecorator('id')id: number) {
    return this.commentsService.createComment(dto, id);
  }
  @ApiQuery({ name: 'carId', example: 1, required: false })
  @ApiQuery({ name: 'parentId', example: 10, required: false })
  @ApiQuery({ name: 'shapeId', example: 10, required: false })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 10, required: false })
  @ApiQuery({ name: 'motoId', example: 10, required: false })
  @Get()
  async getList(@Query()query: FilterCommentsQuery) {
    return this.commentsService.getComments(query);
  }
}