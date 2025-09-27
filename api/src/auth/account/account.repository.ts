import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AccountDto } from './account.dto';
import { Providers } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  async find(provider: Providers, providerAccountId: string) {
    return this.prisma.account.findUnique({
      where: { providerAccountId },
      include: {
        User: true,
      },
    });
  }
  async create(data: AccountDto) {
    return this.prisma.account.create({ data });
  }
}
