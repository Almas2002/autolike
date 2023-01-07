import { InjectRepository } from '@nestjs/typeorm';
import { Marka } from '../entities/car/marka.entity';
import { Repository } from 'typeorm';
import { MarkaExistException } from '../exeptions/marka.exception';
import { CreateMarkaDto, FilterMarkaListQuery } from '../dto/marka.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MarkaService {
  constructor(@InjectRepository(Marka) private markaRepository: Repository<Marka>) {
  }

  async create(dto: CreateMarkaDto): Promise<{ id: number }> {
    const candidate = await this.findOneByTitle(dto.title);
    if (candidate) {
      throw new MarkaExistException();
    }
    const marka = await this.markaRepository.save({ title: dto.title });
    return { id: marka.id };
  }

  async findOneByTitle(title: string): Promise<Marka> {
    return this.markaRepository.findOne({ where: { title } });
  }

  async list(dto: FilterMarkaListQuery): Promise<{ data: Marka[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.markaRepository.createQueryBuilder('mark')
      .orderBy('mark', 'DESC');

    if (dto?.title) {
      query.andWhere('mark.title ILIKE :title', { title: `%${dto.title}%` });
    }
    query.limit(limit);
    query.offset(offset);
    const res = await query.getManyAndCount();
    return { data: res[0], count: res[1] };
  }
  async findOneById(id:number){
    return this.markaRepository.findOne({where:{id}})
  }
  async remove(id:number){
    await this.markaRepository.delete({id})
  }


}