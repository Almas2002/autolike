import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeCarDto } from './like.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {
  }

  @UseGuards(AuthGuard)
  @Post()
  createLike(@Body()dto: CreateLikeCarDto, @UserDecorator('id')id: number) {
    return this.likeService.createLike(dto, id);
  }
}