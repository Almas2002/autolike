import { BoatType } from './boat-type.entity';
import { City } from '../region/entity/city.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Images } from '../file/images.entity';
import { Profile } from '../profile/profile.entity';
import { Comments } from '../comments/comments.entity';
import { Like } from '../like/like.entity';

@Entity()
export class Boat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  price: number;
  @ManyToOne(() => Profile, profile => profile.boats)
  author: Profile;
  @ManyToOne(() => BoatType, type => type.boats)
  type: BoatType;
  @ManyToOne(() => City, city => city.boats)
  city: City;
  @OneToOne(() => Images, image => image.boatAvatar)
  @JoinColumn()
  avatar: Images;
  @OneToMany(() => Images, image => image.boat)
  images: Images[];
  @OneToMany(() => Comments, comments => comments.boat)
  comments: Comments[];
  @OneToMany(() => Like, like => like.boat)
  likes: Like[];
}