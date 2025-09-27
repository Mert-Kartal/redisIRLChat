import { Providers } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  providerAccountId: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Providers)
  provider: Providers;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
