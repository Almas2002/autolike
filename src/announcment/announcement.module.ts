import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car/car.entity';
import { ProfileModule } from '../profile/profile.module';
import { ModelModule } from '../model/model.module';
import { AnnouncementController } from './announcement.controller';
import { About } from './entities/car/car-about.entity';
import { FileModule } from '../file/file.module';
import { RegionModule } from '../region/region.module';
import { MototehnikaModule } from '../mototehnika/mototehnika.module';

@Module({
  providers:[AnnouncementService],
  imports:[TypeOrmModule.forFeature([Car,About]),ProfileModule,ModelModule,FileModule,RegionModule,MototehnikaModule],
  controllers:[AnnouncementController],
  exports:[]
})
export class AnnouncementModule{}