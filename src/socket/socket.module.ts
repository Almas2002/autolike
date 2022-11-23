import { Module } from '@nestjs/common';
import { ConnectedUserService } from './socket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionUser } from './connection-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionUser])],
  providers: [ConnectedUserService],
  exports: [ConnectedUserService],
})
export class SocketModule {}