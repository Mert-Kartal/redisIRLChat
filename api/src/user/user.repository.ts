import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }
  async search(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async show(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async index() {
    return this.prisma.user.findMany();
  }
}
