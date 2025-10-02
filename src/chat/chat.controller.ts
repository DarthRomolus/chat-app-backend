import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';
import { createChatDto } from './DTO/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('createChat')
  createChat(@Body(new ValidationPipe()) createChatDto: createChatDto) {
    return this.chatService.createChat(createChatDto);
  }
  @Post('updateChat')
  updateChat(@Body(new ValidationPipe()) payload: Prisma.ChatUpdateInput) {
    return 'chatUpdated';
  }
  @Get(':id')
  getAllMessages(@Param('id') id: string) {}
}
