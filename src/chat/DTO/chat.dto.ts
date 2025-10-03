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

export class CreateChatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  adminID: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  participants: string[];
}
