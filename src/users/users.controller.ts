import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './DTO/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('')
  findAll() {
    return 'hello world';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    /*return this.userService.getUser(id);*/
  }

  @Patch(':id')
  updateUser(@Body() user: userDto, @Param('id') id: string) {
    return this.userService.updateUser(id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser();
  }
}
