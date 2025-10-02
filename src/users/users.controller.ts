import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { updateUserDto } from './DTO/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('')
  findAll() {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: updateUserDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
