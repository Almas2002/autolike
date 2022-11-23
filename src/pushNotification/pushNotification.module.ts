import {Module} from "@nestjs/common";
import {FireBase} from "./firebase";
import {PushNotificationService} from "./pushNotification.service";
import {PushNotificationController} from "./push-notification.controller";

@Module({
    providers: [FireBase, PushNotificationService],
    exports: [PushNotificationService],
    controllers:[PushNotificationController]
})
export class PushNotificationModule {

}