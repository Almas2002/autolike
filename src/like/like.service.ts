import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';
import { CreateLikeCarDto } from './like.dto';
import { ProfileService } from '../profile/profile.service';
import { ProfileNotFoundException } from '../profile/profile.exception';
import { TypeofEntityEnum } from '../file/file.service';

@Injectable()
export class LikeService {
  constructor(@InjectRepository(Like) private likeRepository: Repository<Like>, private profileService: ProfileService) {
  }

  async createLike(dto: CreateLikeCarDto, userId: number) {
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) {
      throw  new ProfileNotFoundException();
    }
    let object = {};
    if (dto.kind == TypeofEntityEnum.MOTOTECHNICS) {
      object['mototehnic'] = { id: dto.announcementId };
    } else if (dto.kind == TypeofEntityEnum.ANNOUNCEMENT) {
      object['car'] = { id: dto.announcementId };
    } else if (dto.kind == TypeofEntityEnum.SPARE){
      object['shape'] = { id: dto.announcementId };
    }
    const check = await this.checkLike(profile.id, object);
    if (check) {
      await this.likeRepository.delete({id:check.id});
      return
    }

    await this.likeRepository.save({ profile, ...object });
  }

  private async checkLike(profileId: number, object) {
    return this.likeRepository.findOne({ where: { profile: { id: profileId }, ...object } });
  }
}