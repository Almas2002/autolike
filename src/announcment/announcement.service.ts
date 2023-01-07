import { InjectRepository } from '@nestjs/typeorm';
import { Car, Status } from './entities/car/car.entity';
import { Repository } from 'typeorm';
import { About, StatementEnum } from './entities/car/car-about.entity';
import {
  CreateAnnouncementDto,
  FilterAnnouncementQuery,
  FilterAnnouncementQueryAdmins,
  UpdateCarStatusDto,
} from './announcement.dto';
import { ProfileService } from '../profile/profile.service';
import { ProfileNotFoundException } from '../profile/profile.exception';
import { Images } from './entities/images.entity';
import { FileService, TypeofEntityEnum } from '../file/file.service';
import { AnnouncementNotFoundException } from './exception/announcement.exception';
import { ImageNotFoundException } from './exception/image.exception';
import { GeneralModelService } from '../model/service/general-model.service';
import { HttpException } from '@nestjs/common';
import { RegionService } from '../region/region.service';
import { of } from 'rxjs';


export class AnnouncementService {
  constructor(@InjectRepository(Car) private announcementRepository: Repository<Car>,
              @InjectRepository(About) private aboutRepository: Repository<About>,
              private profileService: ProfileService,
              private fileService: FileService, private modelService: GeneralModelService, private regionService: RegionService) {
  }

  async create(dto: CreateAnnouncementDto, userId: number, files: any[]) {
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    const model = await this.modelService.findModel(dto.modelId);
    const body = await this.modelService.findBody(dto.bodyTypeId);
    const marka = await this.modelService.findMark(dto.markaId);
    const generation = await this.modelService.findGeneration(dto.generationId);
    const city = await this.regionService.findOneCityById(dto.cityId);
    const transmission = await this.modelService.findMission(dto.transmissionId);
    if (dto.year < generation.createdFrom || (dto.year > generation.createdTo && generation.createdTo)) {
      throw new HttpException('не правильно введен год', 400);
    }
    if (dto.state === StatementEnum.BOO) {
      if (!dto.mileage) {
        throw new HttpException('не правиольно введены данные', 422);
      }
    }
    const announcement = await this.announcementRepository.save({
      author: profile,
      transmission,
      body,
      city,
      marka,
      model,
      generation,
      description: dto.description,
      price: dto.price,
    });

    if (dto.tags) {
      const tagIds = dto.tags.split(',');
      for (let i = 0; i < tagIds.length; i++) {
        await this.announcementRepository.query(`INSERT INTO car_tags VALUES(${announcement.id},${tagIds[i]})`);
      }

    }

    await this.aboutRepository.save({ car: announcement, ...dto });

    if (files?.length) {
      const image = await this.fileService.uploadFiles(files, announcement, TypeofEntityEnum.ANNOUNCEMENT);
      await this.updateAvatar(announcement.id, image.id, announcement, image);
    }
    return { id: announcement.id };
  }

  private async updateAvatar(announcementId: number, imageId: number, announcement?: Car, photo?: Images) {
    if (!announcement) {
      announcement = await this.announcementRepository.findOne({ where: { id: announcementId } });
      if (!announcement) {
        throw new AnnouncementNotFoundException();
      }
    }
    if (!photo) {
      photo = await this.fileService.findOneImage(imageId);
      if (!photo) {
        throw new ImageNotFoundException();
      }
    }
    announcement.avatar = photo;
    await this.announcementRepository.save(announcement);
  }

  async finOneById(id: number) {
    const query = this.announcementRepository.createQueryBuilder('announcement')
      .select('COUNT(comments.id)', 'commentsCount')
      .addSelect('COUNT(likes.id)', 'likesCount')
      .leftJoin('announcement.likes', 'likes')
      .leftJoin('announcement.comments', 'comments')
      .andWhere('announcement.id = :id', { id });
    const count = await query.getRawMany();
    const a = await this.announcementRepository.findOne({
      where: { id },
      relations: ['about', 'images', 'author', 'author.user', 'marka', 'city', 'body', 'model'],
    });
    return { a, count: count[0] };
  }

  async list(dto: FilterAnnouncementQuery, userId: number) {
    let profile = {
      id: 0,
    };
    if (userId) {
      profile = await this.profileService.getProfileByUserId(userId);
    }

    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.announcementRepository.createQueryBuilder('announcement')
      .select('COUNT(likes.id) as like')
      .addSelect('announcement.id', 'id')
      .addSelect('announcement.views', 'views')
      .addSelect('announcement.createdAt', 'createdAt')
      .addSelect('avatar.image', 'avatar')
      .addSelect('announcement.price', 'price')
      .addSelect('model.title', 'model')
      .addSelect('about.year', 'year')
      .addSelect('about.mileage', 'mileage')
      .addSelect('about.steeringWheel', 'steeringWheel')
      .addSelect('marka.title', 'marka')
      .addSelect('city.title', 'city')
      .addSelect('body.title', 'body')
      .addSelect('about.state', 'state')
      .addSelect('about.volume', 'volume')
      .addSelect('COUNT(images.id)', 'countImages')
      .addSelect('transmission.title', 'transmission')
      .leftJoin('announcement.model', 'model')
      .leftJoin('announcement.transmission', 'transmission')
      .leftJoin('announcement.images', 'images')
      .leftJoin('announcement.avatar', 'avatar')
      .leftJoin('announcement.about', 'about')
      .leftJoin('announcement.marka', 'marka')
      .leftJoin('announcement.likes', 'likes')
      .leftJoin('announcement.city', 'city')
      .leftJoin('announcement.body', 'body')
      .leftJoin('likes.profile', 'profile', `likes.profileId = ${profile.id}`)
      .addSelect('COUNT(profile) as profileLIke')
      .andWhere('announcement.status = :status', { status: 'accepted' })
      .orderBy('announcement.createdAt', 'DESC')
      .groupBy('model.id').addGroupBy('avatar.id').addGroupBy('about.id')
      .addGroupBy('marka.id').addGroupBy('price').addGroupBy('announcement.id')
      .addGroupBy('city').addGroupBy('announcement.createdAt').addGroupBy('transmission.title').addGroupBy('body.title');
    query.limit(limit);
    query.offset(offset);
    if (dto?.models) {
      const modelIds = dto.models.split(',');
      query.andWhere(`announcement.modelId IN (:...modelIds)`, { modelIds });
    }
    if (dto?.marks) {
      const marksIds = dto.marks.split(',');
      query.andWhere('announcement.markaId IN (:...marksIds)', { marksIds });
    }
    if (dto?.volumeFrom) {
      query.andWhere('about.volume >= :volumeFrom', { volumeFrom: dto.volumeFrom });
    }
    if (dto?.volumeTo) {
      query.andWhere('about.volume <= :volumeTo', { volumeTo: dto.volumeTo });
    }
    if (dto?.cities) {
      const citiesId = dto.cities.split(',');
      query.andWhere('announcement.cityId IN (:...citiesId)', { citiesId });
    }
    if (dto?.transmission) {
      query.andWhere('announcement.transmissionId = :transmission', { transmission: dto.transmission });
    }
    if (dto?.driveUnit) {
      query.andWhere('about.driveUnit = :driveUnit', { driveUnit: dto.driveUnit });
    }
    if (dto?.steeringWheel) {
      query.andWhere('about.steeringWheel = :steeringWheel', { steeringWheel: dto.steeringWheel });
    }
    if (dto?.generations) {
      const genIds = dto.generations.split(',');
      query.andWhere('announcement.generationId IN (:...genIds)', { genIds });
    }
    if (dto?.yearTo) {
      query.andWhere('about.year <= :yearTo', { yearTo: dto.yearTo });
    }
    if (dto?.yearFrom) {
      query.andWhere('about.year >= :yearFrom', { yearFrom: dto.yearFrom });
    }
    if (dto?.priceTo) {
      query.andWhere('announcement.price <= :priceTo', { priceTo: dto.priceTo });
    }
    if (dto?.priceFrom) {
      query.andWhere('announcement.price >= :priceFrom', { priceFrom: dto.priceFrom });
    }
    if (dto?.mileageTo) {
      query.andWhere('about.mileage <= :mileageTo', { mileageTo: dto.mileageTo });
    }
    if (dto?.mileageFrom) {
      query.andWhere('about.mileage >= :mileageFrom', { mileageFrom: dto.mileageFrom });
    }
    if (dto?.bodyTypeId) {
      query.andWhere('announcement.bodyId = :bodyId', { bodyId: dto.bodyTypeId });
    }
    if (dto?.orderByPriceASC) {
      query.orderBy('announcement.price', 'ASC');
    }
    if (dto?.orderByPriceDESC) {
      query.orderBy('announcement.price', 'DESC');
    }
    if (dto?.orderByLikesDESC) {
      query.orderBy('COUNT(likes.id)', 'DESC');
    }
    if (dto?.orderByLikesDESC && dto?.orderByPriceDESC) {
      query.orderBy('COUNT(likes.id)', 'DESC').addOrderBy('announcement.price', 'DESC');
    }
    if (dto?.orderByLikesDESC && dto?.orderByPriceASC) {
      query.orderBy('COUNT(likes.id)', 'DESC').addOrderBy('announcement.price', 'ASC');
    }
    const data = await query.getRawMany();
    const count = await query.getCount();
    return { data, count };
  }

  async listAdmins(filter: FilterAnnouncementQueryAdmins) {
    const query = await this.announcementRepository.createQueryBuilder('announcement');
    const limit = filter?.limit || 10;
    const page = filter?.page || 1;
    const offset = page * limit - limit;
    if (filter?.profileId) {
      query.andWhere('announcement.authorId = :authorId', { authorId: filter.profileId });
    }
    if (filter?.status) {
      query.andWhere('announcement.status = :status', { status: filter.status });
    }
    query.limit(limit);
    query.offset(offset);
    const data = await query.getMany();
    const count = await query.getCount();
    return { data, count };
  }

  async changeStatus(id: number, dto:UpdateCarStatusDto) {
     await this.announcementRepository.update({ id }, { status:dto.status });
  }

}