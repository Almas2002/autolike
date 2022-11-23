import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../model/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Filter } from '../../interface/filter';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,) {
  }

  async createMessage(message: CreateMessageDto): Promise<Message> {
    return await this.messageRepository.save({
      ...message,
      user: { id: message.userId },
      room: { id: message.roomId },
    });
  }

  async getAllMessage(id: number, pagination: Filter,newMessages?:boolean) {
    const limit = pagination?.limit || 10;
    const page = pagination?.page || 1;
    const offset = page * limit - limit;
    const query = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.id = :roomId', { roomId: id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.createAt', 'DESC');
    if(newMessages){
      query.andWhere('message.read = :read',{read:false})
    }
    query.limit(limit);
    query.offset(offset);
    return query.getMany();
  }
}