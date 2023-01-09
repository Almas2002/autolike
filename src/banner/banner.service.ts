import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './banner.dto';
import { FileService } from '../file/file.service';
import { Filter } from '../interface/filter';


@Injectable()
export class BannerService {
  constructor(@InjectRepository(Banner) private bannerRepository: Repository<Banner>, private fileService: FileService) {
  }


  async create(dto: CreateBannerDto, file: any): Promise<{ id: number }> {
    try {
      const fileName = await this.fileService.createFile(file);
      const image = await this.fileService.createImage(fileName);
      const banner = await this.bannerRepository.save({ image, ...dto });
      return { id: banner.id };
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async get(pagination: Filter): Promise<{ data: Banner[], count: number }> {
    const limit = pagination?.limit || 10;
    const page = pagination?.limit || 1;
    const offset = page * limit - limit;
    const query = this.bannerRepository.createQueryBuilder('banner')
      .leftJoinAndSelect('banner.image', 'image')
    query.limit(limit);
    query.offset(offset);

    const data = await query.getManyAndCount();
    return { data: data[0], count: data[1] };
  }
}