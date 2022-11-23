import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mototehnics } from '../mototehnika.entity';
import { Repository } from 'typeorm';
import { CreateMototehnikaDto, FilterMototehnikaQuery } from '../dto/mototehnika.dto';
import { FileService, TypeofEntityEnum } from '../../file/file.service';
import { ProfileService } from '../../profile/profile.service';
import { ProfileNotFoundException } from '../../profile/profile.exception';
import { TypeMototehnikaService } from './type-mototehnika.service';
import { Images } from '../../announcment/entities/images.entity';
import { ImageNotFoundException } from '../../announcment/exception/image.exception';
import { MototehniceNotFoundException } from '../exceptions/mototehnice.exception';

@Injectable()
export class MototehnikaService {
  constructor(@InjectRepository(Mototehnics) private mototehnicsRepository: Repository<Mototehnics>, private fileService: FileService, private profileService: ProfileService, private motoType: TypeMototehnikaService) {
  }


  async create(dto: CreateMototehnikaDto, files: any[], userId: number) {
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    const marka = await this.motoType.getOneMarkById(dto.markaId);
    const type = await this.motoType.getOneTypeById(dto.typeId);
    const city = await this.motoType.getOneCityById(dto.cityId);
    const mototehnica = await this.mototehnicsRepository.save({
      author: profile,
      type,
      marka,
      city,
      ...dto,
    });
    if (files?.length) {
      const image = await this.fileService.uploadFiles(files, mototehnica, TypeofEntityEnum.ANNOUNCEMENT);
      await this.updateAvatar(mototehnica.id, image.id, mototehnica, image);
    }
    return { id: mototehnica.id };
  }

  async updateAvatar(mototehnicaId: number, imageId: number, mototehnica: Mototehnics, photo: Images) {
    if (!mototehnica) {
      mototehnica = await this.mototehnicsRepository.findOne({ where: { id: mototehnicaId } });
      if (!mototehnica) {
        throw new MototehniceNotFoundException();
      }
    }
    if (!photo) {
      photo = await this.fileService.findOneImage(imageId);
      if (!photo) {
        throw new ImageNotFoundException();
      }
    }
    mototehnica.avatar = photo;
    await this.mototehnicsRepository.save(mototehnica);
  }

  async list(dto: FilterMototehnikaQuery, id: number) {
    let profile = {
      id: 0,
    };
    if (id) {
      profile = await this.profileService.getProfileByUserId(id);
    }
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.mototehnicsRepository.createQueryBuilder('moto')
      .select('moto.id', 'id')
      .addSelect('COUNT(likes.id) as like')
      .addSelect('COUNT(images.id) as countImages')
      .addSelect('marka.title', 'marka')
      .addSelect('moto.views', 'views')
      .addSelect('moto.createdAt', 'createdAt')
      .addSelect('avatar.image', 'avatar')
      .addSelect('moto.price', 'price')
      .leftJoin('moto.likes', 'like')
      .leftJoin('moto.images', 'images')
      .leftJoin('moto.avatar', 'avatar')
      .leftJoin('moto.marka', 'marka')
      .leftJoin('moto.likes', 'likes')
      .leftJoin('moto.city', 'city')
      .leftJoin('likes.profile', 'profile', `likes.profileId = ${profile.id}`)
      .orderBy('moto.createdAt', 'DESC')
      .groupBy('moto.id').addGroupBy('avatar.image').addGroupBy('marka.title');
    query.limit(limit);
    query.offset(offset);

    if (dto?.marks) {
      const marksIds = dto.marks.split(',');
      query.andWhere('moto.markaId IN (:...marksIds)', { marksIds });
    }
    if (dto?.types) {
      const typesIds = dto.types.split(',');
      query.andWhere('moto.typeId IN (:...typesIds)', { typesIds });
    }
    if (dto.yearTo) {
      query.andWhere('moto.year <= :yearTo', { yearTo: dto.yearTo });
    }
    if (dto.yearFrom) {
      query.andWhere('moto.year >= :yearFrom', { yearFrom: dto.yearFrom });
    }
    if (dto.priceTo) {
      query.andWhere('moto.price <= :priceTo', { priceTo: dto.priceTo });
    }
    if (dto.priceFrom) {
      query.andWhere('moto.price >= :priceFrom', { priceFrom: dto.priceFrom });
    }
    if (dto?.orderByLikesDESC) {
      query.orderBy('COUNT(likes.id)', 'DESC');
    }
    if (dto?.orderByPriceASC) {
      query.orderBy('announcement.price', 'ASC');
    }
    if (dto?.orderByPriceDESC) {
      query.orderBy('announcement.price', 'DESC');
    }

    if (dto?.orderByLikesDESC && dto?.orderByPriceDESC) {
      query.orderBy('COUNT(likes.id)', 'DESC').addOrderBy('moto.price', 'DESC');
    }
    if (dto?.orderByLikesDESC && dto?.orderByPriceASC) {
      query.orderBy('COUNT(likes.id)', 'DESC').addOrderBy('moto.price', 'ASC');
    }

    const data = await query.getRawMany();
    const count = await query.getCount();
    return { data, count };
  }
}