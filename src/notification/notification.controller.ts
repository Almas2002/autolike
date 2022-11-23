import { Body, Controller, Post } from '@nestjs/common';
import { NotificationGatewayService } from './service/notification-gateway.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationGatewayService: NotificationGatewayService) {}

  @Post()
  createNotification(@Body('message')message: string) {
    return this.notificationGatewayService.congratulationNotification(message);
  }


}