import { Model } from './model.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../../announcment/entities/car/car.entity';
import { Spare } from '../../../spares/spare.entity';

@Entity()
export class Marka {
  @ApiProperty({description:"идентификатор",example:1})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({description:"title of marka",example:"Toyota"})
  @Column({ unique: true })
  title: string;
  @OneToMany(() => Model, model => model.marka)
  models: Model[];
  @OneToMany(()=>Spare,model=>model.marka)
  spares:Spare[]
  @OneToMany(() => Car, object => object.marka)
  cars: Car[];
}