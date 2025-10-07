import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  authorId: string;
  @IsNotEmpty()
  chatId: string;
}
