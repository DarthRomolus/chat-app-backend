import { Body, Controller, Post } from '@nestjs/common';
import { chatDto } from './DTO/chat.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Post('createChat')
  createChat(@Body(new ValidationPipe()) payload: chatDto) {
    return 'chat created';
  }
  @Post('updateChat')
  updateChat(@Body(new ValidationPipe()) payload: chatDto) {
    return 'chatUpdated';
  }
}
