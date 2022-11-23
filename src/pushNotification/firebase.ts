import {Injectable} from "@nestjs/common";
import * as admin from "firebase-admin"
import * as serviceAccount from "./conf.json"
import {Notification, NotificationType} from "../notification/notification.entity";
import {ServiceAccount} from "firebase-admin/lib/app";

@Injectable()
export class FireBase {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        })
    }

    async sendNotification(token: string, notification: Notification) {
        let title;
        if(notification.type === NotificationType.ROOM){
            title = "Новые знакомства"
        }
        if(notification.type === NotificationType.LIKE){
            title = "Симпатия"
        }
        if(notification.type === NotificationType.MESSAGE){
            title = "Новое сообщение"
        }
        const payload = {
            notification: {
                title: title,
                body: `${notification.text}`,
            },
            // "data" : {
            //     "volume" : "3.21.15",
            //     "contents" : "http://www.news-magazine.com/world-week/21659772"
            // },
            "data": {
                "ttl": "86400s",
                "data": JSON.stringify(notification),
                "hello":"Aley"
            },
        }
        console.log(JSON.stringify(notification))


        return await admin.messaging().sendToDevice(token, payload)
    }
}