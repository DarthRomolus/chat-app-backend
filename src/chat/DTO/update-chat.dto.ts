import { CreateChatDto } from './chat.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateChatDto extends PartialType(CreateChatDto) {}
