import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Description } from './description.entity';
import { Car } from '../../../announcment/entities/car/car.entity';

@Entity()
export class DescriptionTags{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @ManyToOne(()=>Description,object => object.tags,{onDelete:'CASCADE'})
  description:Description
  @ManyToMany(()=>Car,object => object.tags,{onDelete:'CASCADE'})
  cars:Car[]
}