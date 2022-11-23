import { Room } from './room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class JoinedRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, user => user)
  user: User;
  @Column()
  socketId: string;
  @ManyToOne(() => Room, room => room)
  room: Room;
}