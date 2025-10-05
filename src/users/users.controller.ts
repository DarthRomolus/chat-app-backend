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
  findAll() {
    return this.userService.getAllUsers();
  }
  @Get('me')
  getUser(@Request() req) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return this.userService.getUserById(req.user.sub);
  }

  @Patch('me')
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: updateUserDto,
    @Request() req,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return this.userService.updateUser(updateUserDto, req.user.sub);
  }
  @Delete('me')
  deleteUser(@Request() req) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('No authenticated user on request');
    }
    return this.userService.deleteUser(req.user.sub);
  }
}
