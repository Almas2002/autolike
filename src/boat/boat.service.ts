import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boat } from './boat.entity';
import { Repository } from 'typeorm';
import { BoatType } from './boat-type.entity';
import { CreateBoatDto } from './dto/boat.dto';
import { ProfileService } from '../profile/profile.service';
import { ProfileNotFoundException } from '../profile/profile.exception';
import { TypeNotFoundException } from '../mototehnika/exceptions/type.exception';
import { City } from '../region/entity/city.entity';
import { CityNotFoundException } from '../region/exception/city.exception';
import { FileService, TypeofEntityEnum } from '../file/file.service';
import { Images } from '../file/images.entity';
import { ImageNotFoundException } from '../announcment/exception/image.exception';
import { BoatNotFoundException } from './boat.exception';

@Injectable()
export class BoatService {
  constructor(@InjectRepository(Boat) private boatRepository: Repository<Boat>, @InjectRepository(City) private cityRepository: Repository<City>,
              @InjectRepository(BoatType) private boatType: Repository<BoatType>, private profileService: ProfileService,
              private fileService: FileService) {
  }

  async createBoat(dto: CreateBoatDto, userId: number, files: any[]) {
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    const type = await this.getTypeById(dto.typeId);
    const city = await this.cityRepository.findOne({ where: { id: dto.cityId } });
    if (!city) {
      throw new CityNotFoundException();
    }
    const boat = await this.boatRepository.save({ author: profile, type, city, ...dto });
    if (files?.length) {
      const image = await this.fileService.uploadFiles(files, boat, TypeofEntityEnum.BOAT);
      await this.updateAvatar(boat.id, image.id, boat, image);
    }
    return { id: boat.id };
  }

  async getTypeById(id: number) {
    const type = await this.boatType.findOne({ where: { id } });
    if (!type) {
      throw new TypeNotFoundException();
    }
    return type;
  }

   async updateAvatar(boatId: any, imageId: number, boat: Boat, photo: Images) {
    if (!boat) {
      boat = await this.boatRepository.findOne({ where: { id: boatId } });
      if (!boat) {
        throw new BoatNotFoundException();
      }
    }
    if (!photo) {
      photo = await this.fileService.findOneImage(imageId);
      if (!photo) {
        throw new ImageNotFoundException();
      }
    }
    boat.avatar= photo;
    await this.boatRepository.save(boat)
  }

  async getList(){

  }
}
