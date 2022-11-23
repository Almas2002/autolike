import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './region.entity';
import { Car } from '../../announcment/entities/car/car.entity';
import { Mototehnics } from '../../mototehnika/mototehnika.entity';
import { Boat } from '../../boat/boat.entity';


@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @ManyToOne(() => Region, region => region.cities)
  region: Region;
  @OneToMany(() => Car, announcement => announcement.city)
  cars: Car[];

  @OneToMany(()=>Mototehnics,moto=>moto.city)
  mototehnics:Mototehnics[]

  @OneToMany(()=>Boat,boat=>boat.city)
  boats:Boat[]
}