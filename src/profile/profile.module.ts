import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Profile])],
  exports:[ProfileService],
  providers:[ProfileService]
})
export class ProfileModule{}