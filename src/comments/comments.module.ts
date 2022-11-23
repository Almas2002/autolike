import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comments]),ProfileModule],
  controllers:[CommentsController]
})
export class CommentsModule {

}