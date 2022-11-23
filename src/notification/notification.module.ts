import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationService } from './service/notification.service';
import { ChatGateway } from './chat.gateway';
import { NotificationGatewayService } from './service/notification-gateway.service';
import { NotificationController } from './notification.controller';
import { SocketModule } from '../socket/socket.module';
import { ChatModule } from '../chat/chat.module';
import {PushNotificationModule} from "../pushNotification/pushNotification.module";

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), SocketModule,forwardRef(()=>ChatModule),PushNotificationModule],
  controllers: [NotificationController],
  providers: [NotificationService,NotificationGatewayService, ChatGateway ],
  exports: [NotificationGatewayService],
})
export class NotificationModule {
}