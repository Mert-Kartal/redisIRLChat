import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { UserService } from '../../user/user.service';
import { Providers } from '@prisma/client';
import { JwtService } from '../../jwt/jwt.service';
import { User } from '@prisma/client';
@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async findOrCreate(
    name: string,
    email: string,
    providerAccountId: string,
    provider: Providers,
  ) {
    let userPlain: User;
    const existAccount = await this.accountRepository.find(
      provider,
      providerAccountId,
    );
    const user = await this.userService.checkEmail(email);
    if (existAccount) {
      userPlain = existAccount.User;
    } else if (user) {
      await this.accountRepository.create({
        providerAccountId,
        provider,
        userId: user.id,
      });
      userPlain = user;
    } else {
      userPlain = await this.userService.add({
        name,
        email,
      });
      await this.accountRepository.create({
        providerAccountId,
        provider,
        userId: userPlain.id,
      });
    }
    const { accessToken, refreshToken } = await this.jwtService.generateToken({
      userId: userPlain.id,
      role: userPlain.role,
    });
    return { accessToken, refreshToken };
  }
}
