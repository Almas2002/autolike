import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Marka } from './marka.entity';
import { Generation } from './generation.entity';
import { BodyType } from './bodyType.entity';
import { Car } from '../../../announcment/entities/car/car.entity';
import { Spare } from '../../../spares/spare.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  title: string;

  @ManyToOne(() => Marka, marka => marka.models, { onDelete: 'CASCADE' })
  marka: Marka;

  @OneToMany(() => Generation, generation => generation.model)
  generations: Generation[];

  @ManyToOne(() => BodyType, body => body.models, )
  bodyType: BodyType ;
  @OneToMany(()=>Spare,spare=>spare.model)
  spares:Spare
  @OneToMany(() => Car, object => object.model)
  cars: Car[];

}