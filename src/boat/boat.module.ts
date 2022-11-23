import { Module } from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatController } from './boat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boat } from './boat.entity';
import { BoatType } from './boat-type.entity';
import { ProfileModule } from '../profile/profile.module';
import { City } from '../region/entity/city.entity';
import { FileModule } from '../file/file.module';

@Module({
  providers: [BoatService],
  controllers: [BoatController],
  imports:[TypeOrmModule.forFeature([Boat,BoatType,City]),ProfileModule,FileModule]
})
export class BoatModule {}
