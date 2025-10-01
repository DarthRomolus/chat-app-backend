import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class userDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
