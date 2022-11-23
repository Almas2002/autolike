import { Profile } from '../profile/profile.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../announcment/entities/car/car.entity';
import { Mototehnics } from '../mototehnika/mototehnika.entity';
import { Boat } from '../boat/boat.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @ManyToOne(() => Car, object => object.comments, { onDelete: 'CASCADE' })
  car: Car;
  @ManyToOne(() => Profile, profile => profile.comments, { onDelete: 'CASCADE' })
  profile: Profile;
  @ManyToOne(() => Comments, object => object.subComments, { onDelete: 'CASCADE' })
  parentComment: Comments;
  @OneToMany(() => Comments, object => object.parentComment)
  subComments: Comments[];

  @ManyToOne(() => Mototehnics, object => object.comments, { onDelete: 'CASCADE' })
  moto: Mototehnics;

  @ManyToOne(() => Boat, boat => boat.comments)
  boat: Boat;
}