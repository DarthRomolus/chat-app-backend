import { IsNotEmpty } from 'class-validator';

export class wsMessageDto {
  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  content: string;
}
