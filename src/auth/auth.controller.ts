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
  @Post('createUser')
  createUser(@Body(new ValidationPipe()) userDto: Prisma.UserCreateInput) {
    return this.userService.createUser(userDto);
  }
  @Post('login')
  login(@Body(new ValidationPipe()) userLogin) {}
}
