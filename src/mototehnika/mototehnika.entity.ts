import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOfMototechnics } from './typeOfMototechnics.entity';
import { MototehniksMark } from './mototehniks-mark.entity';
import { Profile } from '../profile/profile.entity';
import { Like } from '../like/like.entity';
import { Comments } from '../comments/comments.entity';
import { City } from '../region/entity/city.entity';
import { Images } from '../file/images.entity';


export enum StateMototechnicsEnum {
  ONTHERUN = 'на ходу',
  WITHMILLAGE = 'с пробегом',
  WITHOUTMILLAGE = 'новая без пробега',
  EMERGENCY = 'аварийная'
}

export enum Status {
  NEW = 'new',
  ACCEPTED = 'accepted',
  DELETED = 'deleted',
  DENIED = 'denied',
}

@Entity()
export class Mototehnics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeOfMototechnics, object => object.mototechnics)
  type: TypeOfMototechnics;

  @Column({ enum: StateMototechnicsEnum })
  state: StateMototechnicsEnum;

  @ManyToOne(() => MototehniksMark, mark => mark.mototehniks)
  marka: MototehniksMark;

  @Column({ default: 0 })
  views: number;

  @Column()
  price:number;

  @ManyToOne(() => Profile, profile => profile.mototehnics, { onDelete: 'CASCADE' })
  author: Profile;

  @OneToMany(() => Like, like => like.mototehnic)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => City, city => city)
  city: City;
  @Column({ enum: Status, default: Status.NEW })
  status: Status;

  @OneToMany(() => Comments, comment => comment.mototehnic)
  comments: Comments[];

  @Column()
  description: string;

  @OneToMany(() => Images, image => image.mototechnics)
  images: Images[];

  @OneToOne(() => Images, image => image.mototechnicsAvatar)
  @JoinColumn()
  avatar: Images;

}

