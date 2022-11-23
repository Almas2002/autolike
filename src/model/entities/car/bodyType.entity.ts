import { Model } from './model.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../../announcment/entities/car/car.entity';

@Entity()
export class BodyType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  title: string;
  @OneToMany(() => Model, model => model.bodyType,{onDelete:"CASCADE"})
  models: Model [];

  @OneToMany(() => Car, object => object.body)
  cars: Car[];
}