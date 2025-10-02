import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  minLength,
  MinLength,
} from 'class-validator';

export class createChatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  adminID: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  participants: string[];
}
