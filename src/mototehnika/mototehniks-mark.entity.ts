import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mototehnics } from './mototehnika.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MototehniksMark {
  @ApiProperty({ example: 1, description: 'id of moto' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'audi', description: 'title of mark' })
  @Column()
  title: string;
  @OneToMany(() => Mototehnics, moto => moto.marka)
  mototehniks: Mototehnics[];
}