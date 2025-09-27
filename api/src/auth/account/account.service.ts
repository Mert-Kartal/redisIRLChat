import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { UserService } from '../../user/user.service';
import { Providers } from '@prisma/client';
@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
  ) {}
  async findOrCreate(
    name: string,
    email: string,
    providerAccountId: string,
    provider: Providers,
  ) {
    const existAccount = await this.accountRepository.find(
      provider,
      providerAccountId,
    );
    if (existAccount) {
      return existAccount.User;
    }
    const user = await this.userService.checkEmail(email);
    if (user) {
      await this.accountRepository.create({
        providerAccountId,
        provider,
        userId: user.id,
      });
      return user;
    }
    const newUser = await this.userService.add({
      name,
      email,
    });
    await this.accountRepository.create({
      providerAccountId,
      provider,
      userId: newUser.id,
    });
    return newUser;
  }
}
