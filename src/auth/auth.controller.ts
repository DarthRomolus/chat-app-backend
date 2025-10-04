import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { createUserDto } from 'src/users/DTO/create-user.dto';
import { loginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async createUser(@Body(new ValidationPipe()) userRegister: createUserDto) {
    return await this.authService.register(userRegister);
  }
  @Post('login')
  async login(@Body(new ValidationPipe()) userLogin: loginDto) {
    return await this.authService.login(userLogin);
  }
}
