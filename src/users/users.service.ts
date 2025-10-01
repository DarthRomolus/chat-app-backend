import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUser(email: string, password: string, name: string) {
    return { email, name, password };
  }
  async createUser(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }
  async updateUser(updatedUserDto: Prisma.UserUpdateInput) {
    return { response: 'user updated' };
  }
  async deleteUser(id: string) {
    return 'this will delete user';
  }
}
