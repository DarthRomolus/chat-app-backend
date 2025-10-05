import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Body, OnModuleInit, UseGuards, ValidationPipe } from '@nestjs/common';
import { wsMessageDto } from './DTO/ws-message.dto';
import { joinRoomDto } from './DTO/join-room.dto';
import { ChatService } from 'src/chat/chat.service';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class SocketsGateway implements OnModuleInit {
  constructor(
    private readonly chatsService: ChatService,
    private readonly messagesServic: MessagesService,
    private readonly jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
  @SubscribeMessage('identity')
  handleIdentity(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.data.userId = userId;
    console.log(`Socket ${client.id} is now identified as User ${userId}`);
    return { ok: true, message: `User identified as ${userId}` };
  }
  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody(new ValidationPipe()) body: wsMessageDto) {
    this.server.to(body.room).emit('onMessage', {
      room: body.room,
      content: body.content,
    });
  }
  @SubscribeMessage('joinRoom')
  joinChat(
    @MessageBody(new ValidationPipe()) body: joinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(body.room);
    client.emit('joined room');
  }
}
