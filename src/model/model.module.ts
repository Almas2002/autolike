import { Module } from '@nestjs/common';
import { MarkaController } from './controllers/marka.controller';
import { MarkaService } from './service/marka.service';
import { ModelService } from './service/model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyType } from './entities/car/bodyType.entity';
import { Generation } from './entities/car/generation.entity';
import { Marka } from './entities/car/marka.entity';
import { Model } from './entities/car/model.entity';
import { ModelController } from './controllers/model.controller';
import { BodyTypeController } from './controllers/body-type.controller';
import { BodyService } from './service/body.service';
import { GenerationController } from './controllers/generation.controller';
import { GenerationService } from './service/generation.service';
import { FileModule } from '../file/file.module';
import { GeneralModelService } from './service/general-model.service';
import { TypeOfMototechnics } from '../mototehnika/typeOfMototechnics.entity';
import { DescriptionTags } from './entities/car/description-tags.entity';
import { Description } from './entities/car/description.entity';
import { DescriptionController } from './controllers/description.controller';
import { DescriptionService } from './service/description.service';
import { Transmission } from './entities/car/transmission.entity';

@Module({
  controllers: [MarkaController, ModelController, BodyTypeController, GenerationController, DescriptionController],
  imports: [TypeOrmModule.forFeature([BodyType, Generation, Marka, Model, TypeOfMototechnics, DescriptionTags, Description,Transmission]), FileModule],
  providers: [MarkaService, ModelService, BodyService, GenerationService, GeneralModelService, DescriptionService],
  exports: [GeneralModelService],
})
export class ModelModule {
}