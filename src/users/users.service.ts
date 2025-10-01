import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { userDto } from './DTO/user.dto';

@Injectable()
export class UsersService {
  getUser(email: string, password: string): userDto {
    return { email, password };
  }
  createUser() {
    return 'user created';
  }
  updateUser(id: string) {
    return { response: 'user updated', ID: id };
  }
  deleteUser() {}
}
