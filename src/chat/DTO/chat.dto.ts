import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  minLength,
  MinLength,
} from 'class-validator';

export class chatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  users: string[];
}
