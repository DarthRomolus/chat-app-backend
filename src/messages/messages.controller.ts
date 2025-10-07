import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './DTO/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('new-message')
  async newMessage(@Body() message: MessageDto) {
    const created = await this.messagesService.createMessage(message);
    console.log(created);
    return created;
  }
}
