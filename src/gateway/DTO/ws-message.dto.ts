import { IsNotEmpty } from 'class-validator';

export class wsMessageDto {
  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  content: string;
}
