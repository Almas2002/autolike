import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionUser } from './connection-user.entity';
import { CreateConnectedUserDto } from './dto/create-connected-user.dto';

@Injectable()
export class ConnectedUserService {
  constructor(@InjectRepository(ConnectionUser) private connectedUserRepository: Repository<ConnectionUser>) {
  }

  async createConnectedUser(dto: CreateConnectedUserDto) {
    return await this.connectedUserRepository.save({ socketId: dto.socketId, user: { id: dto.userId } });
  }

  async findAllUser() {
    return this.connectedUserRepository.find({relations:["user"]});
  }

  async findByUserId(id: number) {
    return await this.connectedUserRepository.findOne({ where: { user: { id }},relations:["user","user.profile"] });
  }

  async deleteBySocketId(socketId: string) {
    await this.connectedUserRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.connectedUserRepository.createQueryBuilder().delete().execute();
  }
}