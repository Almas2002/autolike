import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

export enum Wheel {
  RIGHT = 'right',
  LEFT = 'left'
}

export enum DriveIUnitEnum {
  FRONTWHEEL = 'передний привод',
  REAR = 'задний привод',
  FOURWHELL = 'полный привод'
}

export enum StatementEnum{
  BOO = 'б/у',
  NEW = 'новые',
  EMERGENCY = "аварийная"
}
@Entity()
export class About  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  year: number;
  @Column()
  mileage: number;
  @Column({ enum: Wheel, default: Wheel.LEFT })
  steeringWheel: Wheel;
  @Column({ enum: DriveIUnitEnum, default: '' })
  driveUnit: DriveIUnitEnum;
  @Column({type:"float",default:0})
  volume:number
  @Column({enum:StatementEnum,default:StatementEnum.NEW})
  state:StatementEnum
  @OneToOne(() => Car, announcement => announcement.about)
  car: Car;
}