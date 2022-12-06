import { City } from '../region/entity/city.entity';
import { Marka } from '../model/entities/car/marka.entity';
import { Model } from '../model/entities/car/model.entity';
import { Generation } from '../model/entities/car/generation.entity';
import { StatementEnum } from '../announcment/entities/car/car-about.entity';
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
import { Profile } from '../profile/profile.entity';
import { Like } from '../like/like.entity';
import { Images } from '../announcment/entities/images.entity';
import { Comments } from '../comments/comments.entity';


@Entity()
export class Spare {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => City, city => city)
  city: City;
  @Column()
  title: string;
  @Column()
  text: string;
  @Column({ nullable: true })
  code: string;
  @ManyToOne(() => Profile, profile => profile.spares, { onDelete: 'CASCADE' })
  author: Profile;
  @ManyToOne(() => Marka, marka => marka.spares, { onDelete: 'CASCADE' })
  marka: Marka;
  @ManyToOne(() => Model, model => model.spares, { onDelete: 'CASCADE' })
  model: Model;
  @Column({ enum: StatementEnum, default: StatementEnum.NEW })
  state: StatementEnum;
  @ManyToOne(() => Generation, generation => generation.spares)
  generation: Generation;
  @OneToMany(() => Like, like => like.spare)
  likes: Like[];
  @OneToOne(() => Images, images => images.spareAvatar)
  @JoinColumn()
  avatar: Images;
  @Column({ default: 0 })
  price: number;
  @OneToMany(() => Images, images => images.spare)
  images: Images[];
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(()=>Comments,comment=>comment.spare,{onDelete:"CASCADE"})
  comments:Comments []
}