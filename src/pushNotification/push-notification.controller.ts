import {Body, Controller, Post} from "@nestjs/common";
import {Notification, NotificationType} from "../notification/notification.entity";
import {PushNotificationService} from "./pushNotification.service";

@Controller('push')
export class PushNotificationController{
    constructor(private pushNotification:PushNotificationService) {}
    @Post()
    async push(@Body('token')token:string){
        const notification = new Notification()
        notification.type = NotificationType.LIKE
        notification.text = "Алеу"
        return  this.pushNotification.sendNotification(token,notification)
    }
}