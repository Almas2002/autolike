import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../entities/car/model.entity';
import { Repository } from 'typeorm';
import { CreateModelDto, FilterModelListQuery } from '../dto/model.dto';
import { MarkaService } from './marka.service';
import { MarkaNotFoundException } from '../exeptions/marka.exception';
import { ModelExistException, ModelNotFoundException } from '../exeptions/model.exception';
import { BodyService } from './body.service';
import { BodyTypeNotFoundException } from '../exeptions/body-type.exception';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ModelService {
  constructor(@InjectRepository(Model) private modelService: Repository<Model>, private markService: MarkaService, private bodyService: BodyService) {
  }

  async create(dto: CreateModelDto): Promise<{ id: number }> {
    const marka = await this.markService.findOneById(dto.markaId);
    if (!marka) {
      throw new MarkaNotFoundException();
    }
    const body = await this.bodyService.findOneById(dto.bodyTypeId);
    if (!body) {
      throw new BodyTypeNotFoundException();
    }
    const candidate = await this.modelService.findOne({ where: { title: dto.title, marka, bodyType: body } });
    if (candidate) {
      throw new ModelExistException();
    }

    const model = await this.modelService.save({ title: dto.title, marka ,bodyType:body });
    return { id: model.id };
  }

  async getModelByTitleAndMark(title: string) {

  }

  async findOne(id: number): Promise<Model> {
    const model = await this.modelService.findOne({ where: { id }, relations: ['marka', 'generations', 'bodyType'] });
    if (!model) {
      throw new ModelNotFoundException();
    }
    return model;
  }

  async list(dto: FilterModelListQuery): Promise<{ data: Model[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = this.modelService.createQueryBuilder('model')
      .orderBy('model.id', 'DESC');
    if (dto?.markaId) {
      query.andWhere('model.markaId = :markId', { markId: dto.markaId });
    }
    if (dto?.title) {
      query.andWhere('model.title ILIKE :title', { title: `%${dto.title}%` });
    }
    query.limit(limit);
    query.offset(offset);
    const res = await query.getManyAndCount();
    return { data: res[0], count: res[1] };
  }

  async remove (id:number){
    await this.modelService.delete({id})
  }
}