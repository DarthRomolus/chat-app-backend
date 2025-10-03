import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateChatDto } from './DTO/chat.dto';
import { UpdateChatDto } from './DTO/update-chat.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ChatService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
  ) {}
  async createChat(createChatDto: CreateChatDto) {
    let GetUsersByIdArray: string[] = [];
    for (const participant of createChatDto.participants) {
      const user = await this.usersService.getUserByEmail(participant);
      if (!user) {
        throw new UnauthorizedException();
      }
      GetUsersByIdArray.push(user.id);
    }
    const participants = {
      connect: GetUsersByIdArray.map((id) => ({ id: id })),
    };
    return await this.databaseService.chat.create({
      data: {
        name: createChatDto.name,
        adminID: createChatDto.adminID,
        participants: participants,
      },
      include: {
        participants: {
          select: { id: true, name: true },
        },
      },
    });
  }
  async updateChat(updateChatDto: UpdateChatDto, id: string) {
    let GetUsersByIdArray: string[] = [];
    let participants;

    if (updateChatDto.participants == null) {
      participants = {};
    } else {
      for (const participant of updateChatDto.participants) {
        const user = await this.usersService.getUserByEmail(participant);
        if (!user) {
          throw new UnauthorizedException();
        }
        GetUsersByIdArray.push(user.id);
      }
      participants = {
        connect: GetUsersByIdArray.map((id) => ({ id: id })),
      };
    }
    return await this.databaseService.chat.update({
      where: { id: id },
      data: {
        name: updateChatDto.name,
        adminID: updateChatDto.adminID,
        participants: participants,
      },
      include: {
        participants: {
          select: { id: true, name: true },
        },
      },
    });
  }
  async getChat(id: string) {
    return await this.databaseService.chat.findUnique({
      where: { id },
      include: { participants: true },
    });
  }
  async getALLchats() {
    return await this.databaseService.chat.findMany({
      include: { participants: true },
    });
  }
  async deleteChat(id: string) {
    return await this.databaseService.chat.delete({ where: { id } });
  }
}
