import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Like } from '../like/like.entity';
import { Car } from '../announcment/entities/car/car.entity';
import { Spare } from '../spares/spare.entity';
import { Comments } from '../comments/comments.entity';
import { Mototehnics } from '../mototehnika/mototehnika.entity';
import { Boat } from '../boat/boat.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;
  @OneToMany(() => Car, object => object.author)
  cars: Car [];
  @OneToMany(() => Like, like => like.profile)
  myLikes: Like[];
  @OneToMany(() => Spare, spare => spare.author)
  spares: Spare;

  @Column({ default: '' })
  firstName: string;

  @OneToMany(() => Comments, comment => comment.profile)
  comments: Comments[];

  @OneToMany(() => Mototehnics, moto => moto.author)
  mototehnics: Mototehnics [];

  @OneToMany(() => Boat, boat => boat.author)
  boats: Boat[];

}
