import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  getInfo(
    email: string,
    password: string,
  ): { email: string; password: string } {
    return { email, password };
  }
}
