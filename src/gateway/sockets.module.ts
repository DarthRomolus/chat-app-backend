import { Module } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { MessagesModule } from 'src/messages/messages.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ChatModule, MessagesModule, AuthModule, JwtModule],
  providers: [SocketsGateway],
})
export class SocketsModule {}
