import {User} from '../user/user.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Message} from "../chat/model/message.entity";
import {Room} from "../chat/model/room.entity";
import { Like } from '../like/like.entity';

export enum NotificationType {
    LIKE = "LIKE",
    NOTIFICATION = "NOTIFICATION",
    MESSAGE = "MESSAGE",
    ROOM = "ROOM"
}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user, {cascade: true})
    user: User
    @Column()
    text: string
    @Column({enum: NotificationType, default: NotificationType.NOTIFICATION})
    type: NotificationType

    @OneToOne(() => Like, like => like.notification, {onDelete: "CASCADE"})
    @JoinColumn()
    like?: Like

    @OneToOne(() => Message, message => message.notifications, {nullable: true, cascade: true})
    @JoinColumn()
    message?: Message

    @OneToOne(() => Room, room => room.notification)
    @JoinColumn()
    room?: Room
}