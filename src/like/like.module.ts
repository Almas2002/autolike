import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeService } from './like.service';
import { ProfileModule } from '../profile/profile.module';
import { LikeController } from './like.controller';

@Module({
  providers:[LikeService],
  imports:[TypeOrmModule.forFeature([Like]),ProfileModule],
  controllers:[LikeController]
})
export class LikeModule{}