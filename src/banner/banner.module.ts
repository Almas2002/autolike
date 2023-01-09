import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { FileModule } from '../file/file.module';

@Module({
  controllers:[BannerController],
  providers:[BannerService],
  imports:[TypeOrmModule.forFeature([Banner]),FileModule]
})
export class BannerModule{

}