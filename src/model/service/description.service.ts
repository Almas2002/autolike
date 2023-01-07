import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Description } from '../entities/car/description.entity';
import { Repository } from 'typeorm';
import { DescriptionTags } from '../entities/car/description-tags.entity';
import { CreateDescriptionDto, CreateDescriptionTagsDto } from '../dto/description.dto';

@Injectable()
export class DescriptionService {
  constructor(@InjectRepository(Description) private descriptionRepository: Repository<Description>,
              @InjectRepository(DescriptionTags) private tagRepository: Repository<DescriptionTags>) {
  }

  async createDescription(dto: CreateDescriptionDto): Promise<{ id: number }> {
    const candidate = await this.descriptionRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new HttpException('такое описание уже существует!', HttpStatus.CONFLICT);
    }
    const desc = await this.descriptionRepository.save({ title: dto.title });
    return { id: desc.id };
  }

  async createTag(dto: CreateDescriptionTagsDto): Promise<{ id: number }> {
    const candidate = await this.tagRepository.findOne({ where: { title: dto.title } });
    if (candidate) {
      throw new HttpException('такой тэг уже существует!', HttpStatus.CONFLICT);
    }
    const tag = await this.tagRepository.save({ title: dto.title, description: { id: dto.descriptionId } });
    return { id: tag.id };
  }

  async getDescriptionList() {
    return await this.descriptionRepository.find({ relations: ['tags'] });
  }

  async removeTag(id: number) {
    await this.tagRepository.delete({ id });
  }

  async removeDescription(id: number) {
    await this.descriptionRepository.delete({ id });
  }
}