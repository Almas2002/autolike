import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Notification, NotificationType} from '../notification.entity';
import {Repository} from 'typeorm';
import {Message} from "../../chat/model/message.entity";
import {Room} from "../../chat/model/room.entity";
import { Like } from '../../like/like.entity';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {
    }

    async createNotificationForEverybody(text: string) {
        return await this.notificationRepository.save({text});
    }

    async createNotificationForOneUser(text: string, id: number, type: NotificationType) {
        return await this.notificationRepository.save({text, user: {id}, type});

    }
    async createLikeNotification(text: string, id: number, like: Like) {
        return await this.notificationRepository.save({text, user: {id}, like, type: NotificationType.LIKE})
    }

    async createMessageNotification(text: string, message: Message, id: number) {
        return await this.notificationRepository.save({text, user: {id}, message, type: NotificationType.MESSAGE});
    }

    async createRoomNotification(text: string, room: Room, id: number) {
        return await this.notificationRepository.save({text, user: {id}, room, type: NotificationType.ROOM})
    }
}