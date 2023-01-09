import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.milddleaware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ModelModule } from './model/model.module';
import { AnnouncementModule } from './announcment/announcement.module';
import { LikeModule } from './like/like.module';
import { RegionModule } from './region/region.module';
import { SpareModule } from './spares/spare.module';
import { BoatModule } from './boat/boat.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { SocketModule } from './socket/socket.module';
import { BannerModule } from './banner/banner.module';

require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, AuthModule, RoleModule, ModelModule, AnnouncementModule, LikeModule, RegionModule, SpareModule, CommentsModule, NotificationModule, ChatModule, BannerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BoatModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
