import { Car } from './car/car.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Spare } from '../../spares/spare.entity';
import { Mototehnics } from '../../mototehnika/mototehnika.entity';
import { Boat } from '../../boat/boat.entity';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  image: string;

  @ManyToOne(() => Car, object => object.images)
  car: Car;
  @OneToOne(() => Car, object => object.avatar)
  carAvatar: Car;

  @ManyToOne(() => Spare, object => object.images)
  spare: Spare;

  @OneToOne(() => Spare, object => object.avatar)
  spareAvatar: Spare;

  @ManyToOne(() => Mototehnics, moto => moto.images)
  mototechnics: Mototehnics;

  @OneToOne(() => Mototehnics, moto => moto.avatar)
  mototechnicsAvatar: Mototehnics;

  @ManyToOne(() => Boat, boat => boat.images)
  boat: Boat;

  @OneToOne(() => Boat, boat => boat.avatar)
  boatAvatar: Boat;
}