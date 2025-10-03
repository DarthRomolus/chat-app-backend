import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService,
  ) {}

  async login(login: loginDto) {
    const user = await this.userService.getUserByEmail(login.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!login) {
      throw new UnauthorizedException();
    }

    const match = bcrypt.compare(user.password, login.password);

    return 'logged in';
  }
}
