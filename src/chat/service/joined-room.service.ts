import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedRoom } from '../model/joined-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JoinedRoomService {
  constructor(@InjectRepository(JoinedRoom) private joinedRoomRepository: Repository<JoinedRoom>) {
  }

  async create(socketId:string,userId:number,roomId:number){
    return await this.joinedRoomRepository.save({socketId,user:{id:userId},room:{id:roomId}})
  }

  async findByUserId(userId: number) {
    return this.joinedRoomRepository.find({ where: { user: { id: userId } } });
  }

  async findByRoomId(roomId: number) {
    return this.joinedRoomRepository.find({ where: { room: { id: roomId } },relations:["user"] });
  }

  async deleteBySocketId(socketId: string) {
    return this.joinedRoomRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.joinedRoomRepository.createQueryBuilder().delete().execute();
  }
}