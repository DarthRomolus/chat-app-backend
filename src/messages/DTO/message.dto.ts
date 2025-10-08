import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  chatId: string;
  @IsNotEmpty()
  authorId: string;
}
