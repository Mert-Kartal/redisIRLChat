import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../email/email.module';
import { AccountService } from './account/account.service';
import { AccountRepository } from './account/account.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleStrategy } from './strategy/google.strategy';
@Module({
  imports: [UserModule, JwtModule, RedisModule, EmailModule, PrismaModule],
  providers: [AuthService, AccountService, AccountRepository, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
