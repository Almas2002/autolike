import { Images } from '../file/images.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  text: string;
  @OneToOne(() => Images, image => image.banner)
  @JoinColumn()
  image: Images;
}