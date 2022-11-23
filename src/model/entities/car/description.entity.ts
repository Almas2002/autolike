import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DescriptionTags } from './description-tags.entity';


@Entity()
export class Description{
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  title:string;
  @OneToMany(()=>DescriptionTags,object => object.description)
  tags:DescriptionTags[]
}