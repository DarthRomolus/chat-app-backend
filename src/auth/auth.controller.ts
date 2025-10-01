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
import { userDto } from 'src/users/DTO/create-user.dto';

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
  createUser(@Body(new ValidationPipe()) user: userDto) {
    return this.userService.createUser();
  }
}
