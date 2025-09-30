import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

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
  @Get(':id')
  getId(@Param('id') id: string) {
    return { id };
  }
  @Post('create')
  createUser(@Body() user: { email: string; password: string }) {
    return this.userService.getInfo(user.email, user.password);
  }
}
