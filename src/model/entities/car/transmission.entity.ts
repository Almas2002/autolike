import { Generation } from './generation.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../../announcment/entities/car/car.entity';

@Entity('transmissions')
export class Transmission{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @ManyToMany(()=>Generation,generation=>generation.transmissions)
  @JoinTable()
  generations:Generation[]

  @OneToMany(()=>Car,car=>car.transmission)
  cars:Car[]
}