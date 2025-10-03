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

export class loginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
