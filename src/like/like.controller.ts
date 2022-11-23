import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeCarDto } from './like.dto';
import { UserDecorator } from '../decorators/user.decorator';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {
  }

  @Post()
  createLike(@Body()dto: CreateLikeCarDto, @UserDecorator('id')id: number) {
    return this.likeService.createLike(dto, id);
  }
}