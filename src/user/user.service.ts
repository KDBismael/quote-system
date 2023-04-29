import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async all(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }
  async find(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
  async update(params: {
    email: string;
    data: Prisma.UserCreateInput;
  }): Promise<User> {
    const { email, data } = params;
    return await this.prisma.user.update({ where: { email: email }, data });
  }
  async delete(email: string) {
    return await this.prisma.user.delete({ where: { email: email } });
  }
}
