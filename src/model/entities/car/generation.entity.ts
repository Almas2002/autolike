import { Model } from './model.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../../announcment/entities/car/car.entity';
import { Spare } from '../../../spares/spare.entity';
import { Transmission } from './transmission.entity';

@Entity()
export class Generation {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ unique: true })
  title: string;
  @ManyToOne(() => Model, model => model.generations, { onDelete: 'CASCADE' })
  model: Model;
  @Column({ default: '' })
  image: string;
  @ApiProperty()
  @Column()
  createdFrom: number;
  @ApiProperty()
  @Column({ nullable: true })
  createdTo: number;
  @OneToMany(() => Car, object => object.generation)
  cars: Car[];
  @OneToMany(() => Spare, spare => spare.generation)
  spares: Spare[];
  @ManyToMany(()=>Transmission,transmission=>transmission.generations)
  transmissions:Transmission[]
}