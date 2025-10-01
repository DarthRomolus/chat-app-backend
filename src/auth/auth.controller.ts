import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { userDto } from 'src/users/DTO/user.dto';

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
  createUser(@Body() user: userDto) {
    return this.userService.createUser();
  }
}
