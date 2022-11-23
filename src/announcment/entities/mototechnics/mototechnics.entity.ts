import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeofEntityEnum } from '../../../file/file.service';
import { TypeOfMototechnics } from '../../../mototehnika/typeOfMototechnics.entity';

export enum StateMototechnicsEnum{
   ONTHERUN = "на ходу",
   WITHMILLAGE = "с пробегом",
   WITHOUTMILLAGE = "новая без пробега",
   EMERGENCY = "аварийная"
}
@Entity()
export class Mototechnics{
   @PrimaryGeneratedColumn()
   id:number;

   @ManyToOne(()=>TypeOfMototechnics,object => object.mototechnics)
   type:TypeOfMototechnics

   @Column({enum:StateMototechnicsEnum})
   state:StateMototechnicsEnum



}