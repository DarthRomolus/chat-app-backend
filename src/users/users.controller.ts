import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUserDto } from './DTO/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('')
  async findAll() {
    return await this.userService.getAllUsers();
  }
  @Get('me')
  async getUser(@Request() req) {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return await this.userService.getUserById(userId);
  }
  @Get('chats')
  async getAllChats(@Request() req) {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return await this.userService.getAllUserChat(userId);
  }
  @Get('exists')
  async checkUserExists(@Request() req) {
    const userId = req.user.sub;
    return this.userService.checkUserExists(userId);
  }
  @Patch('me')
  async updateUser(
    @Body(new ValidationPipe()) updateUserDto: updateUserDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return await this.userService.updateUser(updateUserDto, userId);
  }
  @Delete('me')
  async deleteUser(@Request() req) {
    const userId = req.user.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return await this.userService.deleteUser(userId);
  }
}
