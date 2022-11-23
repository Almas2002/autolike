import { Profile } from '../profile/profile.entity';
import { Car } from '../announcment/entities/car/car.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Spare } from '../spares/spare.entity';
import { Notification } from '../notification/notification.entity';
import { Mototehnics } from '../mototehnika/mototehnika.entity';
import { Boat } from '../boat/boat.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, profile => profile.myLikes)
  profile: Profile;
  @ManyToOne(() => Car, announcement => announcement.likes)
  car: Car;
  @ManyToOne(() => Spare, spare => spare.likes, { onDelete: 'CASCADE' })
  spare: Spare;

  @OneToOne(() => Notification, notification => notification.like)
  notification: Notification;


  @ManyToOne(() => Mototehnics, moto => moto.likes, { cascade: true })
  mototehnic: Mototehnics;

  @ManyToOne(() => Boat, boat => boat.likes)
    boat: Boat;
  }