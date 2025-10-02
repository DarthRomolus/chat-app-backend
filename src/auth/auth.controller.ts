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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  authHello() {
    return 'hey';
  }
  @Post('register')
  createUser(@Body(new ValidationPipe()) userDto: createUserDto) {
    return this.userService.createUser(userDto);
  }
  @Post('login')
  login(@Body(new ValidationPipe()) userLogin) {}
}
