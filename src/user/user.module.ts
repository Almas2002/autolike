import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { Profile } from '../profile/profile.entity';

@Module({
  controllers:[],
  providers:[UserService],
  imports:[TypeOrmModule.forFeature([User,Profile]),forwardRef(()=>AuthModule),RoleModule],
  exports:[UserService]
})
export class UserModule{}