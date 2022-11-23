import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfMototechnics } from './typeOfMototechnics.entity';
import { Mototehnics } from './mototehnika.entity';
import { TypeMototehnikaService } from './service/type-mototehnika.service';
import { MototehnikaService } from './service/mototehnika.service';
import { FileModule } from '../file/file.module';
import { ProfileModule } from '../profile/profile.module';
import { City } from '../region/entity/city.entity';
import { MototehniksMark } from './mototehniks-mark.entity';
import { MototehnikaController } from './mototehnika.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfMototechnics, Mototehnics,City,MototehniksMark]),FileModule,ProfileModule],
  providers:[TypeMototehnikaService,MototehnikaService],
  exports:[MototehnikaService],
  controllers:[MototehnikaController]
})
export class MototehnikaModule {}