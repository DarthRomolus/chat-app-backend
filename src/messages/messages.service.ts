import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createMessage(content: string, authorId: string, chatId: string) {
    return await this.databaseService.message.create({
      data: {
        content: content,
        author: {
          connect: { id: authorId }, // connect the message to the existing user
        },
        chat: {
          connect: { id: chatId }, // connect the message to the existing chat
        },
      },
    });
  }
}
