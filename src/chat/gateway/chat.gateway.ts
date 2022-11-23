// import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
// import { verify } from 'jsonwebtoken';
// import { ConnectedUserService } from '../../socket/socket.service';
//
//
// @WebSocketGateway({ namespace: '/chat', cors: true })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
//   constructor(private connectedUserService: ConnectedUserService) {
//   }
//
//   @WebSocketServer() wss: Server;
//
//   sendToUser(userId: string, data: Notification) {
//     this.wss.to(userId).emit('notification', data);
//   }
//
//   async handleConnection(socket: Socket, data: any) {
//     let token;
//     if (!socket.handshake.query.token) {
//       return null;
//     }
//     try {
//       token = verify(`${socket.handshake.query.token}`, 'hello world');
//       socket.data.user = token;
//       await this.connectedUserService.createConnectedUser({ socketId: socket.id, userId: token.id });
//     } catch (e) {
//       return ChatGateway.disconnect(socket);
//     }
//   }
//
//   private static disconnect(socket: Socket) {
//     socket.emit('Error', new UnauthorizedException('вы не зарегестрированы'));
//     socket.disconnect();
//   }
//
//   async handleDisconnect(client: Socket): Promise<void> {
//     await this.connectedUserService.deleteBySocketId(client.id);
//
//   }
//
//   async onModuleInit(): Promise<void> {
//     await this.connectedUserService.deleteAll();
//   }
// }