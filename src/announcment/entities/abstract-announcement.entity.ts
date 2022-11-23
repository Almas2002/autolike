import { Column, PrimaryGeneratedColumn } from 'typeorm';


export class AbstractAnnouncement{
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  description:string;
  @Column()
  price:number;
  @Column()
  year:number;
}