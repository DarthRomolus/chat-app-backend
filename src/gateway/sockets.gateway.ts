import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Body, OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class SocketsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any, client: any, payload: any): string {
    this.server.emit('onMessage', {
      msg: 'emitted',
      content: body,
    });
    return 'Hello world!';
  }
}
