import { InjectRepository } from '@nestjs/typeorm';
import { MototehniksMark } from '../mototehniks-mark.entity';
import { Repository } from 'typeorm';
import { TypeOfMototechnics } from '../typeOfMototechnics.entity';
import { Injectable } from '@nestjs/common';
import { CreateMarkaDto } from '../../model/dto/marka.dto';
import { MarkaExistException } from '../../model/exeptions/marka.exception';
import { CreateTypeAuto } from '../../announcment/announcement.dto';
import { TypeExistException, TypeNotFoundException } from '../exceptions/type.exception';
import { MarkNotFoundException } from '../exceptions/mark.exception';
import { City } from '../../region/entity/city.entity';
import { CityNotFoundException } from '../../region/exception/city.exception';

@Injectable()
export class TypeMototehnikaService {
  constructor(@InjectRepository(MototehniksMark) private markaRepository: Repository<MototehniksMark>,
              @InjectRepository(TypeOfMototechnics) private typeRepository: Repository<TypeOfMototechnics>,
              @InjectRepository(City) private cityRepository: Repository<City>) {
  }

  async createMark(dto: CreateMarkaDto): Promise<{ id: number }> {
    const candidate = await this.getOneMarkByValue(dto.title);
    if (candidate) {
      throw new MarkaExistException();
    }
    const mark = await this.markaRepository.save({ title: dto.title });
    return { id: mark.id };
  }

  async getOneMarkByValue(title: string) {
    return this.markaRepository.findOne({ where: { title } });
  }

  async getMarks() {
    return this.markaRepository.find();
  }

  async getOneMarkById(id: number) {
    const mark = await this.markaRepository.findOne({ where: { id } });
    if (!mark) {
      throw new MarkNotFoundException();
    }
    return mark;
  }

  async createType(dto: CreateTypeAuto) {
    const candidate = await this.getOneTypeByValue(dto.title);
    if (candidate) {
      throw new TypeExistException();
    }
    const type = await this.typeRepository.save({ title: dto.title });
    return { id: type.id };
  }

  async getOneTypeByValue(title: string) {
    return this.typeRepository.findOne({ where: { title } });
  }

  async getOneTypeById(id: number) {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) {
      throw new TypeNotFoundException();
    }
    return type;
  }

  async getOneCityById(id: number) {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new CityNotFoundException();
    }
    return city;
  }

  async getTypes() {
    return this.typeRepository.find();
  }
}