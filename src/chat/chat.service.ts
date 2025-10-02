import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { createChatDto } from './DTO/chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly dataBaseService: DatabaseService) {}
  async createChat(createChatDto: createChatDto) {
    return await this.dataBaseService.chat.create({
      data: {
        name: createChatDto.name,
        adminID: createChatDto.adminID,
        participants: {
          connect: createChatDto.participants.map((id) => ({ id: id })),
        },
      },
      include: {
        participants: {
          select: { id: true, name: true },
        },
      },
    });
  }
}
