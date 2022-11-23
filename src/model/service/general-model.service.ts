import { BodyService } from './body.service';
import { GenerationService } from './generation.service';
import { MarkaService } from './marka.service';
import { ModelService } from './model.service';
import { ModelNotFoundException } from '../exeptions/model.exception';
import { Model } from '../entities/car/model.entity';
import { BodyTypeNotFoundException } from '../exeptions/body-type.exception';
import { BodyType } from '../entities/car/bodyType.entity';
import { GenerationNotFoundException } from '../exeptions/generation.exception';
import { Generation } from '../entities/car/generation.entity';
import { MarkaNotFoundException } from '../exeptions/marka.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { take } from 'rxjs';
@Injectable()
export class GeneralModelService {
  constructor(private bodyService: BodyService, private generationService: GenerationService
    , private markaService: MarkaService, private modelService: ModelService) {
  }

  async findModel(id: number): Promise<Model> {
    const model = await this.modelService.findOne(id);
    if (!model) {
      throw new ModelNotFoundException();
    }
    return model;
  }

  async findBody(id: number): Promise<BodyType> {
    const body = await this.bodyService.findOneById(id);
    if (!body) {
      throw new BodyTypeNotFoundException();
    }
    return body;
  }

  async findGeneration(id: number): Promise<Generation> {
    const generation = await this.generationService.findOneById(id);
    if (!generation) {
      throw new GenerationNotFoundException();
    }
    return generation;
  }

  async findMark(id: number) {
    const mark = await this.markaService.findOneById(id);
    if (!mark) {
      throw new MarkaNotFoundException();
    }
    return mark;
  }

  async findMission(id:number){
    const transmission = await this.generationService.getTransMissionById(id)
    if (!transmission){
      throw new NotFoundException("такого двигателя не существует")
    }
    return transmission
  }
}