import { IsNotEmpty } from 'class-validator';

export class joinRoomDto {
  @IsNotEmpty()
  room: string;
}
