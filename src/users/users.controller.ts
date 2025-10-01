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
import { userDto } from './DTO/create-user.dto';
import { updateUserDto } from './DTO/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('')
  findAll() {
    return 'hello world';
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    /*return this.userService.getUser(id);*/
  }

  @Patch(':id')
  updateUser(
    @Body(new ValidationPipe()) user: updateUserDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUser(id);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser();
  }
}
