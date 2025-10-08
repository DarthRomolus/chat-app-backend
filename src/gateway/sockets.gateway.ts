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
import { RoomDto } from './DTO/room.dto';
import { ChatService } from 'src/chat/chat.service';
import { MessagesService } from 'src/messages/messages.service';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
@UseGuards(WsJwtGuard)
export class SocketsGateway implements OnModuleInit {
  constructor(
    private readonly chatsService: ChatService,
    private readonly messagesService: MessagesService,
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
  @SubscribeMessage('newMessage')
  async handleMessage(@MessageBody(new ValidationPipe()) body: wsMessageDto) {
    await this.messagesService.createMessage(body);
    this.server.to(body.chatId).emit('onMessage', {
      chatId: body.chatId,
      authorId: body.authorId,
      content: body.content,
    });
  }
  @SubscribeMessage('joinRoom')
  joinChat(
    @MessageBody(new ValidationPipe()) body: RoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(body.room);
    client.emit('joined room');
  }
  @SubscribeMessage('leaveRoom')
  leaveChat(
    @MessageBody(new ValidationPipe()) body: RoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(body.room);
    client.emit('left room');
  }
}
