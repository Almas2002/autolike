import { Role } from '../role/role.entity';
import {
  AfterInsert,
  Column,
  Entity,
  getConnection,
  JoinTable,
  ManyToMany, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { ConnectionUser } from '../socket/connection-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column({ select: false })
  password: string;
  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Profile, object => object.user)
  profile: Profile;
  @OneToMany(() => ConnectionUser, user => user.user)
  connection: ConnectionUser[];

  @AfterInsert()
  private async handleAfterInsert() {
    const profile = new Profile();
    profile.user = this;
    await getConnection().manager.save(Profile);
  }
}