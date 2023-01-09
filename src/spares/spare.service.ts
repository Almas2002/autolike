import { InjectRepository } from '@nestjs/typeorm';
import { Spare } from './spare.entity';
import { Repository } from 'typeorm';
import { CreateSpateDto, FilterShapeQuery } from './spate.dto';
import { GeneralModelService } from '../model/service/general-model.service';
import { RegionService } from '../region/region.service';
import { ProfileService } from '../profile/profile.service';
import { FileService, TypeofEntityEnum } from '../file/file.service';
import { Images } from '../file/images.entity';
import { ImageNotFoundException } from '../announcment/exception/image.exception';
import { ShapeNotFoundException } from './shape.exception';

export class SpareService {
  constructor(@InjectRepository(Spare) private spareRepository: Repository<Spare>,
              private modelService: GeneralModelService, private regionService: RegionService, private profileService: ProfileService,
              private fileService: FileService) {
  }

  async create(dto: CreateSpateDto, userId: number, files: any[]): Promise<{ id: number }> {
    const author = await this.profileService.getProfileByUserId(userId);
    const model = await this.modelService.findModel(dto.modelId);
    const marka = await this.modelService.findMark(dto.markaId);
    const generation = await this.modelService.findGeneration(dto.generationId);
    const city = await this.regionService.findOneCityById(dto.cityId);
    const spare = await this.spareRepository.save({ author, model, marka, generation, city, ...dto });

    if (files?.length) {
      const image = await this.fileService.uploadFiles(files, spare, TypeofEntityEnum.SPARE);
      await this.updateAvatar(spare.id, image.id, spare, image);
    }
    return { id: spare.id };
  }

  async getOne(id: number): Promise<Spare> {
    return this.spareRepository.findOne(
      { where: { id }, relations: ['images', 'avatar', 'author', 'author.user', 'model', 'marka', 'generation'] });
  }

  async getList(dto: FilterShapeQuery, userId: number): Promise<{ data: Spare[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    let profile = {
      id: 0,
    };
    if (userId) {
      profile = await this.profileService.getProfileByUserId(userId);
    }
    const query = await this.spareRepository.createQueryBuilder('shape')
      .select('COUNT(likes.id) as likes')
      .addSelect('shape.id', 'id')
      .addSelect('shape.title', 'title')
      .addSelect('shape.state', 'state')
      .addSelect('shape.createdAt', 'createdAt')
      .addSelect('avatar.image', 'avatar')
      .addSelect('shape.price', 'price')
      .addSelect('model.title', 'model')
      .addSelect('marka.title', 'marka')
      .addSelect('city.title', 'city')
      .leftJoin('shape.model', 'model')
      .leftJoin('shape.avatar', 'avatar')
      .leftJoin('shape.marka', 'marka')
      .leftJoin('shape.likes', 'likes')
      .leftJoin('shape.city', 'city')
      .leftJoin('likes.profile', 'profile', `likes.profileId = ${profile.id}`)
      .addSelect('COUNT(profile) as profileLIke')
      .groupBy('model.id').addGroupBy('avatar.id')
      .addGroupBy('marka.id').addGroupBy('price').addGroupBy('shape.id')
      .addGroupBy('city').addGroupBy('shape.createdAt')
      .orderBy("shape.createdAt","DESC")

    if (dto?.models) {
      const modelIds = dto.models.split(',');
      query.andWhere(`shape.modelId IN (:...modelIds)`, { modelIds });
    }
    if (dto?.marks) {
      const marksIds = dto.marks.split(',');
      query.andWhere('shape.markaId IN (:...marksIds)', { marksIds });
    }
    if (dto?.cities) {
      const citiesId = dto.cities.split(',');
      query.andWhere('shape.cityId IN (:...citiesId)', { citiesId });
    }
    if (dto?.generations) {
      const genIds = dto.generations.split(',');
      query.andWhere('shape.generationId IN (:...genIds)', { genIds });
    }
    if (dto?.priceTo) {
      query.andWhere('shape.price <= :priceTo', { priceTo: dto.priceTo });
    }
    if (dto?.priceFrom) {
      query.andWhere('shape.price >= :priceFrom', { priceFrom: dto.priceFrom });
    }
    if (dto?.title) {
      query.andWhere('shape.title ILIKE :title OR shape.text ILIKE :title', { title: dto.title });
    }
    if(dto?.orderByPriceASC){
      query.orderBy("shape.price","ASC")
    }
    if(dto?.orderByPriceDESC){
      query.orderBy("shape.price","DESC")
    }
    if (dto?.orderByLikesDESC) {
      query.orderBy('likes', 'DESC');
    }
    if (dto?.orderByLikesDESC && dto?.orderByPriceDESC) {
      query.orderBy('likes', 'DESC').addOrderBy('shape.price', 'DESC');
    }
    if (dto?.orderByLikesDESC && dto?.orderByPriceASC) {
      query.orderBy('likes', 'DESC').addOrderBy('shape.price', 'ASC')
    }
    query.limit(limit);
    query.offset(offset);
    const data = await query.getRawMany();
    const count = await query.getCount();
    return { data, count };
  }

  private async updateAvatar(spareId: number, imageId: number, spare?: Spare, image?: Images) {
    if (!spare) {
      spare = await this.spareRepository.findOne({ where: { id: spareId } });
      if (!spare) {
        throw new ShapeNotFoundException();
      }
    }
    if (!image) {
      image = await this.fileService.findOneImage(imageId);
      if (!image) {
        throw new ImageNotFoundException();
      }
    }
  }
}