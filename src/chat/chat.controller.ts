import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';
import { CreateChatDto } from './DTO/chat.dto';
import { UpdateChatDto } from './DTO/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('createChat')
  createChat(@Body(new ValidationPipe()) createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }
  @Patch('updateChat/:id')
  async updateChat(
    @Body(new ValidationPipe()) updateChatDto: UpdateChatDto,
    @Param('id') id: string,
  ) {
    return await this.chatService.updateChat(updateChatDto, id);
  }
  @Get(':id')
  async getChat(@Param('id') id: string) {
    return await this.chatService.getChat(id);
  }
  @Get('')
  async getAllChats() {
    return await this.chatService.getALLchats();
  }
  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return await this.chatService.deleteChat(id);
  }
}
