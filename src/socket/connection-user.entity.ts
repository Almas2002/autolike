import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectionUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, user => user.connection)
  user: User;
  @Column()
  socketId: string;
}