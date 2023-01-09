import { Car } from '../announcment/entities/car/car.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Spare } from '../spares/spare.entity';
import { Mototehnics } from '../mototehnika/mototehnika.entity';
import { Boat } from '../boat/boat.entity';
import { Banner } from '../banner/banner.entity';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  image: string;

  @ManyToOne(() => Car, object => object.images,{ onDelete: 'CASCADE' })
  car: Car;
  @OneToOne(() => Car, object => object.avatar,{ onDelete: 'CASCADE' })
  carAvatar: Car;

  @ManyToOne(() => Spare, object => object.images,{ onDelete: 'CASCADE' })
  spare: Spare;

  @OneToOne(() => Spare, object => object.avatar,{ onDelete: 'CASCADE' })
  spareAvatar: Spare;

  @ManyToOne(() => Mototehnics, moto => moto.images,{ onDelete: 'CASCADE' })
  mototechnics: Mototehnics;

  @OneToOne(() => Mototehnics, moto => moto.avatar,{ onDelete: 'CASCADE' })
  mototechnicsAvatar: Mototehnics;

  @ManyToOne(() => Boat, boat => boat.images,{ onDelete: 'CASCADE' })
  boat: Boat;

  @OneToOne(()=>Banner,banner=>banner.image)
  banner:Banner

  @OneToOne(() => Boat, boat => boat.avatar,{ onDelete: 'CASCADE' })
  boatAvatar: Boat;
}