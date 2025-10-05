import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  async createMessage(data: string, authorId: string, chatId: string) {}
}
