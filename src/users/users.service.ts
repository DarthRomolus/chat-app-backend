import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { updateUserDto } from './DTO/update-user.dto';
import { createUserDto } from './DTO/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllUsers() {
    return await this.databaseService.user.findMany();
  }
  async getAllUserChat(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id: id },
      include: { chats: true },
    });
  }
  async getUserById(id: string) {
    return await this.databaseService.user.findUnique({
      where: { id: id },
    });
  }
  async checkUserExists(id: string) {
    const exits = await this.databaseService.user.findUnique({
      where: { id: id },
    });
    if (exits) {
      return { msg: 'exists' };
    } else {
      return { msg: 'failed' };
    }
  }
  async getUserByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: { email },
      include: { chats: true },
    });
  }
  async createUser(createUserDto: createUserDto) {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    createUserDto.password = hash;
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }
  async updateUser(updatedUserDto: updateUserDto, id: string) {
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
