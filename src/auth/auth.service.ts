import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { createUserDto } from 'src/users/DTO/create-user.dto';
import { Prisma, User } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(register: createUserDto) {
    const exist = await this.userService.getUserByEmail(register.email);
    if (exist) throw new UnauthorizedException('Email already in use');

    await this.userService.createUser(register);

    const user = await this.userService.getUserByEmail(register.email);
    if (!user) throw new UnauthorizedException('error');

    return this.issueAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(login: loginDto) {
    const user = await this.userService.getUserByEmail(login.email);
    if (!user) {
      throw new UnauthorizedException('user doesnt exist');
    }
    if (!login) {
      throw new UnauthorizedException('no login params');
    }

    const match = bcrypt.compare(user.password, login.password);
    if (!match) {
      throw new UnauthorizedException('password incorrect');
    }

    return this.issueAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  private async issueAccessToken(user: {
    id: string;
    name: string;
    email: string;
  }) {
    const payload = { sub: user.id, name: user.name, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: process.env.JWT_ACCESS_EXPIRES ?? '15m',
    });
    return { accessToken, user };
  }
}
