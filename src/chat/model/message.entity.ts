import { User } from '../../user/user.entity';
import { Room } from './room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Notification} from "../../notification/notification.entity";


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @ManyToOne(() => User, user => user)
  user: User;
  @ManyToOne(() => Room, room => room.messages)
  room: Room;
  @Column({default:false})
  read:boolean
  @CreateDateColumn({type:"timestamp"})
  createAt: Date;
  @UpdateDateColumn({type:"timestamp"})
  updatedAt: Date;

  @OneToOne(()=>Notification,notification=>notification.message)
  notifications:Notification
}