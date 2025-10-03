import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
