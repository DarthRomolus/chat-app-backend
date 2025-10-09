import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from './DTO/message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createMessage(message: MessageDto) {
    return await this.databaseService.message.create({
      data: {
        content: message.content,
        name: message.name,
        author: {
          connect: { id: message.authorId },
        },
        chat: {
          connect: { id: message.chatId },
        },
      },
    });
  }
}
