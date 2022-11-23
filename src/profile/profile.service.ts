import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {
  }

  async create(user: User) {
    await this.profileRepository.save({ user });
  }

  async getProfileByUserId(id: number) {
    return this.profileRepository.findOne({ where: { user: { id } } });
  }

  async profileMe(id: number) {
    return this.profileRepository.findOne({ where: { user: { id } }, relations: [] });
  }
}