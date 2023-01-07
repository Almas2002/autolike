import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Images } from '../images.entity';
import { Like } from '../../../like/like.entity';
import { About } from './car-about.entity';
import { Profile } from '../../../profile/profile.entity';
import { Model } from '../../../model/entities/car/model.entity';
import { Marka } from '../../../model/entities/car/marka.entity';
import { Generation } from '../../../model/entities/car/generation.entity';
import { BodyType } from '../../../model/entities/car/bodyType.entity';
import { City } from '../../../region/entity/city.entity';
import { Comments } from '../../../comments/comments.entity';
import { Transmission } from '../../../model/entities/car/transmission.entity';
import { DescriptionTags } from '../../../model/entities/car/description-tags.entity';

export enum Status {
  NEW = 'new',
  ACCEPTED = 'accepted',
  DELETED = 'deleted',
  DENIED = 'denied'
}

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Images, images => images.carAvatar)
  @JoinColumn()
  avatar: Images;
  @Column({ default: 0 })
  price: number;
  @Column({ default: '' })
  description: string;
  @ManyToOne(() => Model, object => object.cars, { onDelete: 'CASCADE' })
  model: Model;
  @ManyToOne(() => Marka, object => object.cars, { onDelete: 'CASCADE' })
  marka: Marka;
  @ManyToOne(() => Generation, object => object.cars, { onDelete: 'CASCADE' })
  generation: Generation;
  @ManyToOne(() => BodyType, object => object.cars, { onDelete: 'CASCADE' })
  body: BodyType;
  @ManyToOne(() => City, city => city, { onDelete: 'CASCADE' })
  city: City;
  @ManyToOne(() => Transmission, object => object.cars,{ onDelete: 'CASCADE' })
  transmission: Transmission;
  @OneToMany(() => Images, images => images.car,{ onDelete: 'CASCADE' })
  images: Images[];
  @ManyToOne(() => Profile, profile => profile.cars, { onDelete: 'CASCADE' })
  author: Profile;
  @ManyToMany(() => DescriptionTags, object => object.cars)
  @JoinTable({ name: 'car_tags' })
  tags: DescriptionTags[];
  @OneToOne(() => About, about => about.car)
  @JoinColumn()
  about: About;
  @OneToMany(() => Like, like => like.car,{ onDelete: 'CASCADE' })
  likes: Like[];
  @CreateDateColumn()
  createdAt: Date;
  @Column({ enum: Status, default: Status.NEW })
  status: Status;
  @OneToMany(() => Comments, comment => comment.car)
  comments: Comments[];

  @Column({ default: 0 })
  views: number;

}
