import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../model/room.entity';
import { Repository } from 'typeorm';
import { SemiProfileService } from './semi-profile.service';
import { NotificationGatewayService } from '../../notification/service/notification-gateway.service';
import { CreateChatDto } from '../dto/create-chat.dto';


@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private profileService: SemiProfileService, @Inject(forwardRef(() => NotificationGatewayService)) private notification: NotificationGatewayService,
  ) {
  }

  async getRoomsForUser(userId: number) {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.messages', 'messages').limit(1)
      .addSelect('messages').addOrderBy('messages.createAt', 'DESC').limit(1)
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users').limit(2)
      .leftJoinAndSelect('all_users.profile', 'profile')
      .leftJoinAndSelect('profile.avatar', 'avatar')
      .leftJoinAndSelect('room.channel', 'channel')
      .orderBy('room.createAt', 'DESC')
      .addOrderBy('messages.id', 'DESC');
    query.limit(999);

    return await query.getMany();


  }

  async createRoom(creator: User, dto: CreateChatDto) {
    const profile = await this.profileService.getUserByProfileId(dto.profileId);
    if (!profile) {
      throw new HttpException('профиль не найден', 404);
    }
    const creatorProfile = await this.profileService.getUserProfile(creator.id);
    let combination = profile.id + creatorProfile.id;
    const query = this.roomRepository.createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('profile.avatar', 'avatar')
      .where('room.combination = :combination', { combination });
    const candidate = await query.getOne();
    if (candidate) {
      return candidate;
    }

    const room = await this.roomRepository.save({ combination });
    room.users = [creator, profile.user];
    await this.roomRepository.save(room);
    await this.notification.roomNotification(`вам хочет написать ${creatorProfile?.firstName}`, room, profile.user);
    return room;
  }

  async getRoom(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['joinedUsers', 'joinedUsers.user', 'users'],
    });
  }


}