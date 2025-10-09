import { IsNotEmpty } from 'class-validator';

export class wsMessageDto {
  @IsNotEmpty()
  chatId: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  name: string;
}
