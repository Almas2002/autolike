import { InjectRepository } from '@nestjs/typeorm';
import { BodyType } from '../entities/car/bodyType.entity';
import { Repository } from 'typeorm';
import { CreateBodyTypeDto } from '../dto/body-type.dto';
import { BodyTypeExistException } from '../exeptions/body-type.exception';
import { ConflictException, Injectable } from '@nestjs/common';
import { TypeOfMototechnics } from '../../mototehnika/typeOfMototechnics.entity';
import { CreateTypeMotoDto } from '../dto/type-moto.dto';

@Injectable()
export class BodyService {
  constructor(@InjectRepository(BodyType) private bodyPrivate: Repository<BodyType>,
              @InjectRepository(TypeOfMototechnics) private motoTypeRepository: Repository<TypeOfMototechnics>) {
  }

  async create(dto: CreateBodyTypeDto): Promise<{ id: number }> {
    const candidate = await this.findOneByValue(dto.title);
    if (candidate) {
      throw new BodyTypeExistException();
    }
    const body = await this.bodyPrivate.save({ title: dto.title });
    return { id: body.id };
  }

  async findOneByValue(title: string): Promise<BodyType> {
    return await this.bodyPrivate.findOne({ where: { title } });
  }

  async findOneById(id: number): Promise<BodyType> {
    return await this.bodyPrivate.findOne({ where: { id } });
  }

  async list(): Promise<BodyType[]> {
    return this.bodyPrivate.find();
  }

  async createMoto(dto: CreateTypeMotoDto): Promise<{ id: number }> {
    const candidate = await this.motoTypeRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new ConflictException('такой мото тип уже существует');
    }
    const { id } = await this.motoTypeRepository.save({ title: dto.title });
    return { id };
  }

  async getMotoTypesList(): Promise<TypeOfMototechnics []> {
    return this.motoTypeRepository.find();
  }

}

