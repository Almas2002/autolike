import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boat } from './boat.entity';

@Entity()
export class BoatType{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;

  @OneToMany(()=>Boat,boat=>boat.type)
  boats:Boat[]
}