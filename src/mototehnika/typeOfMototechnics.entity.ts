import { Mototechnics } from '../announcment/entities/mototechnics/mototechnics.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TypeOfMototechnics{
  @ApiProperty({description:"id of type",example:1})
  @PrimaryGeneratedColumn()
  id:number;
  @ApiProperty({description:"название типа для мототехники",example:"Мотоцикл"})
  @Column({unique:true})
  title:string;
  @OneToMany(()=>Mototechnics,object => object.type)
  mototechnics:Mototechnics[]
}