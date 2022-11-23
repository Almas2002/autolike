import { Module } from '@nestjs/common';
import { SpareController } from './spare.controller';
import { SpareService } from './spare.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spare } from './spare.entity';
import { RegionModule } from '../region/region.module';
import { ModelModule } from '../model/model.module';
import { Images } from '../announcment/entities/images.entity';
import { FileModule } from '../file/file.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers:[SpareController],
  providers:[SpareService],
  imports:[TypeOrmModule.forFeature([Spare,Images]),RegionModule,ModelModule,ProfileModule,FileModule]
})
export class SpareModule{
}