import {Injectable} from "@nestjs/common";
import {FireBase} from "./firebase";
import {Notification} from "../notification/notification.entity";

@Injectable()
export class PushNotificationService{
     constructor(private fireBase:FireBase) {}

     async sendNotification(token:string,notification:Notification) {
         try {
            return await this.fireBase.sendNotification(token,notification)
         } catch (e){
             console.log(e)
         }

     }
}