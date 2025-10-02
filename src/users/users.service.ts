import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers() {
    return this.databaseService.user.findMany();
  }
  async getUser(id: string) {
    return this.databaseService.user.findUnique({
      where: { id: id },
    });
  }
  async createUser(createUserDto: Prisma.UserCreateInput) {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    createUserDto.password = hash;
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }
  async updateUser(updatedUserDto: Prisma.UserUpdateInput, id: string) {
    return await this.databaseService.user.update({
      where: { id: id },
      data: updatedUserDto,
    });
  }
  async deleteUser(id: string) {
    return await this.databaseService.user.delete({
      where: { id: id },
    });
  }
}
